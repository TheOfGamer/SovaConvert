

import React from "react";
import {Button, ButtonGroup, Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, CardBody, Card, Input} from "@nextui-org/react";
import {title, subtitle} from "@/components/primitives";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Padlock from "../public/padlock.png";

export default function Home() {
    const rightImageStyle = {
        position: 'right',
    }
    const router = useRouter();
  return (
    <main className="dark">
<center>
    <div className="my-auto">
            <Card className="max-w-md w-full px-6 py-8 rounded-lg shadow-md mb-auto">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-100 dark:text-gray-100">SovaConvert</h1>
                    <p className="mt-2 text-gray-400 dark:text-gray-400">ИИ конвертор файлов из любого формата!</p>
                </div>
                <form className="mt-6 space-y-4">
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
                                        <span>Загрузите файл</span>
                                        <input className="sr-only" id="input-file" type="file" />
                                    </label>
                                    <p className="pl-1">или используйте drag and drop</p>
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
                            <Input variant="bordered" className="w-full" id="input-type" placeholder="Исходный тип" type="text" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 dark:text-gray-300" htmlFor="output-type">
                                Преобразовать в
                            </label>
                            <Input variant="bordered" className="w-full" id="output-type" placeholder="Выходной тип" type="text" />
                        </div>
                    </div>
                    <Button className="w-full" type="submit" color="primary">
                        Начать конвертацию
                    </Button>
                </form>
            </Card>
    </div>
</center>

    </main>
  );
}
