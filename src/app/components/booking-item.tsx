import { Badge } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage } from "./ui/avatar";

export function BookingItem() {
  return (
    <>
      <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
        Agendamentos
      </h2>
      <Card>
        <CardContent className="flex justify-between p-0">
          <div className="flex flex-col gap-2 py-5 pl-5">
            <Badge className="w-fit">Confirmado</Badge>
            <h3 className="font-semibold">Corte de Cabelo</h3>
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
            <p className="text-sm">Agosto</p>
            <p className="text-2xl">07</p>
            <p className="text-sm">20:00</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
