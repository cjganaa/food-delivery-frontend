"use client";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useUser } from "@clerk/nextjs";

const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
  ]
export default function Home() {
  const {user,isLoaded} = useUser();
  if(!isLoaded){
    null;
  }
  const isAdmin = user?.publicMetadata.role == "admin"

  return (
      <div className="flex flex-col items-center w-full h-full p-6 gap-6 pt-16">
        {
          isAdmin?
            <div className="bg-background w-full h-full rounded-3xl border">
            <div className="border-b p-4">
                <h1 className="font-bold text-xl">Order</h1>
                items
            </div>
            
            <Table>
            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                    <TableCell className="font-medium">{invoice.invoice}</TableCell>
                    <TableCell>{invoice.paymentStatus}</TableCell>
                    <TableCell>{invoice.paymentMethod}</TableCell>
                    <TableCell className="text-right">{invoice.totalAmount}</TableCell>
                </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
            </Table>
        </div>:<div className="flex flex-col items-center w-full h-full p-6 gap-6 pt-16"></div>
        }
        {
          isAdmin?
          <Pagination>
          <PaginationContent>
              <PaginationItem>
              <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
              <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
              <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
              <PaginationLink href="#">5</PaginationLink>
              </PaginationItem>
              <PaginationItem>
              <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
              <PaginationLink href="#">10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
              <PaginationNext href="#" />
              </PaginationItem>
          </PaginationContent>
          </Pagination>:null
        }
        

      </div>
  );
}
