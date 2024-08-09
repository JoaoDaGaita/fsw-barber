import { SearchIcon } from "lucide-react";
import { Header } from "./components/header";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import Image from "next/image";
import { db } from "./lib/prisma";
import { BarberShopItem } from "./components/barber-shop-item";
import { quickSearchOptions } from "./_constants/search";
import { BookingItem } from "./components/booking-item";

export default async function Home() {
  const barberShops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  });

  return (
    <>
      <Header />
      <div className="p-5">
        {/* Texto*/}
        <h2 className="text-xl font-bold">Olá, João</h2>
        <p>Quarta, 7 de agosto.</p>

        {/*Busca*/}
        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça sua Busca..." />
          <Button>
            <SearchIcon color="white" />
          </Button>
        </div>
        {/* Busca Rápida*/}
        <div className="mt-6 flex gap-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {quickSearchOptions.map((quickSearch) => (
            <Button
              key={quickSearch.title}
              className="gap-2"
              variant="secondary"
            >
              <Image
                src={quickSearch.imageUrl}
                alt={quickSearch.title}
                sizes="100vw"
                width={16}
                height={16}
              />
              {quickSearch.title}
            </Button>
          ))}
        </div>
        {/* Banner*/}
        <div className="relative mt-6 h-[150px] w-full">
          <Image
            alt="Agende nos melhores barbeiros"
            src="/banner.png"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        {/*Agendamento*/}
        <BookingItem />

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Recomendados
        </h2>
        <div className="flex gap-4 overflow-auto overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {barberShops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Populares
        </h2>
        <div className="flex gap-4 overflow-auto overflow-x-scroll [&::-webkit-scrollbar]:hidden">
          {popularBarbershops.map((barbershop) => (
            <BarberShopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </>
  );
}
