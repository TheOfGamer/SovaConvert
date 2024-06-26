//ГовноКод от SG - off
import {Button,
    ButtonGroup,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    Link,
    CardBody,
    Card,
    Input,
    Code,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure} from "@nextui-org/react";
import {title, subtitle} from "@/components/primitives";
import { useEffect } from "react";
import { useState } from "react";
import Image from "next/image";
import React from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
//ГовноКод от SG - on

export default function Home() {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    useEffect(() => {
        const showModal = localStorage.getItem('showModal');
        if (!showModal) {
            onOpen();
            localStorage.setItem('showModal', 'false');
        }
    }, []);
    const [file, setFile] = useState(null);
    const [inputType, setInputType] = useState('');
    const [outputType, setOutputType] = useState('');

    const handleFileChange = event => {
        setFile(event.target.files[0]);
    };

    const handleInputTypeChange = event => {
        setInputType(event.target.value);
    };

    const handleOutputTypeChange = event => {
        setOutputType(event.target.value);
    };

    const handleSubmit = async event => {
        event.preventDefault();

        if (!file || !inputType || !outputType) {
            toast.error("Необходимо выбрать файл и указать типы преобразования!");
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('inputType', inputType);
        formData.append('outputType', outputType);

        try {
            const response = await axios.post('https://convert-cdn.sovagroup.one/index.php', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.data) {
                if (response.data.startsWith("https")) {
                    const newWindow = window.open(response.data, '_blank');
                    if (newWindow) {
                        newWindow.opener = null;
                    }
                } else {
                    toast.error(response.data);
                }
            } else {
                toast.error(response.data);
            }
        } catch (error) {
            toast.error("Критическая ошибка. Обратитесь в техническую поддержку.");
        }
    };
  return (
    <main className="dark">
<center>
    <div className="my-auto">
    <div>
        <Toaster
            position="bottom-center"
            reverseOrder={false}
            toastOptions={{
                className: '',
                style: {
                    border: '1px solid #181818',
                    padding: '10px',
                    color: '#fff',
                    backgroundColor: '#181818',
                },
            }}
        />
    </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} className="dark">
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Обратите внимание!</ModalHeader>
                        <ModalBody>
                            <p>
                                SovaConvert использует технологии искуственного интеллекта для обработки файлов.
                                ИИ может допускать ошибки, возможно повреждение файла или неточная конвертация.
                            </p>
                            <p>
                                Продолжая использовать этот сайт вы соглашаетесь с условиями соглашения SovaGroup, OwlCloud, а также OpenAI.
                            </p>
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onPress={onClose}>
                                Принять
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
            <Card className="max-w-md w-full px-6 py-8 rounded-lg shadow-md mb-auto">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-100 dark:text-gray-100">SovaConvert</h1>
                    <p className="mt-2 text-gray-400 dark:text-gray-400">ИИ конвертор файлов из любого формата!</p>
                </div>
                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-300 dark:text-gray-300" htmlFor="input-file">
                            Загрузить файл
                        </label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                            <div className="space-y-1 text-center">

                                <div className="flex text-sm text-gray-400 dark:text-gray-400">
                                    <label
                                        className="relative cursor-pointer rounded-md font-medium text-red-500 hover:text-indigo-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                        htmlFor="input-file"
                                    >
                                        <input type="file" id="input-file" onChange={handleFileChange} />
                                    </label>

                                </div>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Любое расширение, до 100МБ</p>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 dark:text-gray-300" htmlFor="input-type">
                                Перобразовать из
                            </label>
                            <Input maxLength="10" variant="bordered" className="w-full" id="input-type" value={inputType} onChange={handleInputTypeChange} placeholder="Исходный тип" type="text" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 dark:text-gray-300" htmlFor="output-type">
                                Преобразовать в
                            </label>
                            <Input maxLength="10" variant="bordered" className="w-full" id="output-type" value={outputType} onChange={handleOutputTypeChange} placeholder="Выходной тип" type="text" />
                        </div>
                    </div>
                    <Button className="w-full" type="submit" color="primary">
                        Начать конвертацию
                    </Button>
                </form>
            </Card>
    </div>
    <div className="mt-80"></div>
    <Code>Made with ♥ by <Code color="primary"><a href="https://sovagroup.one/" target="_blank" rel="noopener noreferrer">SovaGroup</a></Code></Code>
</center>

    </main>
  );
}
