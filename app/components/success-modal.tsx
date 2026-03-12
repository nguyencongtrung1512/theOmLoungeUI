import * as React from 'react'
import { X } from 'lucide-react'
import { Dialog, DialogContent } from '~/components/ui/dialog'

interface SuccessModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: React.ReactNode
}

export function SuccessModal({ open, onOpenChange, title, description }: SuccessModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='bg-[#F9F5EF] border-none shadow-2xl p-6 text-center max-w-xl'>
        <button
          onClick={() => onOpenChange(false)}
          className='absolute top-4 right-4 text-[#523C14] hover:opacity-75 transition-opacity z-50'
        >
          <X size={24} />
        </button>
        <div className='flex flex-col items-center justify-center'>
          <img src='/Illustration.svg' alt='Success' className='w-30 h-30 mb-3' />
          <h2 className="text-3xl font-normal text-[#222732] font-['Playfair_Display'] mb-2 tracking-wider">{title}</h2>
          <div className='text-[#715E28] text-sm leading-relaxed max-w-lg mx-auto'>{description}</div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
