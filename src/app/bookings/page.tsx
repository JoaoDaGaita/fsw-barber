import { getServerSession } from "next-auth";
import Header from "../components/header";
import { authOptions } from "../lib/auth";
import { notFound } from "next/navigation";
import { BookingItem } from "../components/booking-item";
import { getConfirmedBooks } from "../_data/get-confirmed-books";
import { getFinishedBooks } from "../_data/get-finished-books";

const Bookings = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return notFound();
  }
  const confirmedBookings = await getConfirmedBooks();

  const finishedBookings = await getFinishedBooks();
  return (
    <>
      <Header />
      <div className="space-y-3 p-5">
        <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
          Agendamentos
        </h2>
        {confirmedBookings.length === 0 && finishedBookings.length === 0 && (
          <p className="text-gray-400">Você não possui nenhum agendamento.</p>
        )}
        {confirmedBookings && confirmedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Confirmados
            </h2>

            {confirmedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}

        {finishedBookings.length > 0 && (
          <>
            <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
              Finalizados
            </h2>
            {finishedBookings.map((booking) => (
              <BookingItem
                key={booking.id}
                booking={JSON.parse(JSON.stringify(booking))}
              />
            ))}
          </>
        )}
      </div>
    </>
  );
};

export default Bookings;
