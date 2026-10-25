import { UserPlus } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { CreatePersonForm } from '@/features/people/components/create-person-form'

export function CreatePersonDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <UserPlus />
          Nova pessoa
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Nova pessoa</DialogTitle>
          <DialogDescription>Todos os campos são obrigatórios.</DialogDescription>
        </DialogHeader>
        <CreatePersonForm
          onCreated={() => setOpen(false)}
          secondaryAction={
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
          }
        />
      </DialogContent>
    </Dialog>
  )
}
