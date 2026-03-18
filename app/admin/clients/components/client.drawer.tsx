import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ReactNode } from "react";

interface ClientDrawerProps {
  trigger: ReactNode;
}

const ClientDrawer = ({ trigger }: ClientDrawerProps) => {
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>{trigger}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add a Client</DrawerTitle>
          <DrawerDescription>Sample description</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};

export default ClientDrawer;
