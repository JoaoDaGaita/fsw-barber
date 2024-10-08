"use client";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Prisma } from "@prisma/client";
import { Badge } from "./ui/badge";
import { format, isFuture } from "date-fns";
import { ptBR } from "date-fns/locale";

import {
  SheetContent,
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
  SheetClose,
} from "./ui/sheet";
import Image from "next/image";
import { PhoneItem } from "./phone-item";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { deleteBooking } from "../_actions/delete-booking";
import { toast } from "sonner";
import { useState } from "react";
import { BookingSummary } from "./booking-summary";

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>;
}
export function BookingItem({ booking }: BookingItemProps) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const {
    service: { barbershop },
  } = booking;
  const isConfirmed = isFuture(booking.date);

  const handleCancelBooking = async () => {
    try {
      await deleteBooking(booking.id);
      setIsSheetOpen(false);
      toast.success("Reserva cancelada com sucesso!");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSheetOpenChange = (isOpen: boolean) => {
    setIsSheetOpen(isOpen);
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
      <SheetTrigger className="w-full">
        <Card className="min-w-[90%]">
          <CardContent className="flex justify-between p-0">
            <div className="flex flex-col gap-2 py-5 pl-5">
              <Badge
                className="w-fit"
                variant={isConfirmed ? "default" : "secondary"}
              >
                {isConfirmed ? "Confirmado" : "Finalizado"}
              </Badge>

              <h3 className="font-semibold">{booking.service.name}</h3>
              <div className="flex items-center gap-2">
                <Avatar className="h-6 w-6">
                  <AvatarImage
                    className="rounded-sm"
                    src="https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png"
                  />
                </Avatar>
                <p>Barbearia Johnny</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
              <p className="text-sm">
                {format(booking.date, "MMMM", { locale: ptBR })}
              </p>
              <p className="text-2xl">
                {format(booking.date, "dd", { locale: ptBR })}
              </p>
              <p className="text-sm">
                {format(booking.date, "HH:mm", { locale: ptBR })}
              </p>
            </div>
          </CardContent>
        </Card>
      </SheetTrigger>
      <SheetContent className="w-[90%]">
        <SheetHeader>
          <SheetTitle className="text-left">Informações da Reserva</SheetTitle>
        </SheetHeader>
        <div className="relative mt-6 flex h-[180px] w-full items-end">
          <Image
            src="/map.png"
            fill
            className="rounded-xl object-cover"
            alt={""}
          />

          <Card className="z-50 mx-5 mb-3 w-full rounded-xl">
            <CardContent className="flex items-center gap-3 px-5 py-3">
              <Avatar>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>
              <div>
                <h3 className="font-bold">{barbershop.name}</h3>
                <p className="text-xs">{barbershop.address}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-4">
          <Badge
            className="w-fit"
            variant={isConfirmed ? "default" : "secondary"}
          >
            {isConfirmed ? "Confirmado" : "Finalizado"}
          </Badge>

          {/* <Card className="mb-6 mt-3">
            <CardContent className="space-y-3 p-3">
              <div className="flex items-center justify-between">
                <h2 className="font-bold">{booking.service.name}</h2>
                <p className="text-sm font-bold">
                  {Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  }).format(Number(booking.service.price))}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Data</h2>
                <p className="text-sm">
                  {format(booking.date, "d 'de' MMMM", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Horário</h2>
                <p className="text-sm">
                  {format(booking.date, "HH:mm", {
                    locale: ptBR,
                  })}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <h2 className="text-sm text-gray-400">Barbearia</h2>
                <p className="text-sm">{barbershop.name}</p>
              </div>
            </CardContent>
          </Card> */}
          <div className="mb-3 mt-6">
            <BookingSummary
              service={booking.service}
              barbershop={barbershop}
              selectedDate={booking.date}
            />
          </div>

          <div className="space-y-2">
            {barbershop.phones.map((phone, index) => (
              <PhoneItem key={index} phone={phone} />
            ))}
          </div>
        </div>

        <SheetFooter className="mt-6">
          <div className="flex items-center gap-3">
            <SheetClose asChild>
              <Button variant="outline" className="w-full">
                Voltar
              </Button>
            </SheetClose>
            {isConfirmed && (
              <>
                <Dialog>
                  <DialogTrigger>
                    <Button variant="destructive">Cancelar reserva</Button>
                  </DialogTrigger>
                  <DialogContent className="w-[90%]">
                    <DialogHeader>
                      <DialogTitle>
                        Tem certeza que deseja cancelar?
                      </DialogTitle>
                      <DialogDescription>
                        Ao cancelar, você perderá sua reserva e não poderá
                        recuperá-la.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="flex flex-row gap-3">
                      <DialogClose asChild>
                        <Button variant="secondary" className="w-full">
                          Voltar
                        </Button>
                      </DialogClose>
                      <DialogClose>
                        <Button
                          className="w-full"
                          variant="destructive"
                          onClick={handleCancelBooking}
                        >
                          Confirmar
                        </Button>
                      </DialogClose>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
