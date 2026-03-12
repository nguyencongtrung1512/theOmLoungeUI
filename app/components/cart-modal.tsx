import * as React from 'react'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '~/components/ui/sheet'
import { Clock, Minus, Plus, X, ChevronRight, ArrowRight, ChevronLeft } from 'lucide-react'
import { SuccessModal } from './success-modal'
import { TECHNICIANS, TIME_SLOTS } from '~/constants/mock-data'
import { useAppDispatch, useAppSelector } from '~/redux/hooks'
import { setSelectedDate, setSelectedTime, setSelectedTechnicianIndex } from '~/redux/slices/bookingSlice'
import type { CartItem, Technician } from '~/types/ServiceType'

interface CartModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CartItem[]
  onUpdateQuantity?: (id: string, q: number) => void
  onRemoveItem?: (id: string) => void
}

const formatPrice = (p: number) => p.toLocaleString('vi-VN') + ' đ'

const fetchTechnicians = async (): Promise<Technician[]> => {
  return TECHNICIANS
}

export function CartModal({ open, onOpenChange, items, onUpdateQuantity, onRemoveItem }: CartModalProps) {
  const dispatch = useAppDispatch()
  const selectedDate = useAppSelector((state) => state.booking.selectedDate)
  const selectedTime = useAppSelector((state) => state.booking.selectedTime)
  const selectedTechnicianIndex = useAppSelector((state) => state.booking.selectedTechnicianIndex)

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const [showTechnicianList, setShowTechnicianList] = React.useState(false)
  const [technicians, setTechnicians] = React.useState<Technician[]>(TECHNICIANS)
  const [step, setStep] = React.useState('cart')
  const [showSuccessModal, setShowSuccessModal] = React.useState(false)

  const days = React.useMemo(() => {
    const today = new Date()
    const currentDay = today.getDay()
    const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay

    const result = []
    for (let i = 0; i < 7; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + mondayOffset + i)

      const dayName = i === 6 ? 'Chủ Nhật' : `Thứ ${i + 2}`
      const dateString = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`

      const checkDate = new Date(date)
      checkDate.setHours(0, 0, 0, 0)
      const todayCheck = new Date(today)
      todayCheck.setHours(0, 0, 0, 0)

      const isPast = checkDate.getTime() < todayCheck.getTime()
      const isToday = checkDate.getTime() === todayCheck.getTime()

      result.push({
        day: dayName,
        date: dateString,
        fullDate: date,
        disabled: isPast,
        isToday: isToday
      })
    }
    return result
  }, [])

  React.useEffect(() => {
    const today = days.find((d) => d.isToday)
    if (today && !selectedDate) {
      dispatch(setSelectedDate(today.date))
    }
  }, [days, selectedDate, dispatch])

  const handleBooking = () => {
    setShowSuccessModal(true)
    onOpenChange(false)
  }

  React.useEffect(() => {
    fetchTechnicians().then(setTechnicians)
  }, [])

  const groupedItems = [] as Array<CartItem & { children: CartItem[] }>
  const map: Record<string, CartItem & { children: CartItem[] }> = {}

  items.forEach((item) => {
    const parentId = item.parentId
    const parent = parentId ? items.find((p) => p.id === parentId) : null

    if (parent) {
      if (!map[parent.id]) {
        map[parent.id] = { ...parent, children: [] }
        groupedItems.push(map[parent.id])
      }
      map[parent.id].children.push(item)
    } else {
      if (!map[item.id]) {
        map[item.id] = { ...item, children: [] }
        groupedItems.push(map[item.id])
      }
    }
  })

  return (
    <>
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          side='right'
          className='flex flex-col p-0 w-[280px] sm:w-[300px] border-l-0 bg-[#f7f0e6] top-[68px] h-[calc(100vh-68px)] shadow-none'
          style={{ fontFamily: "'Be Vietnam Pro', sans-serif" }}
        >
          <SheetHeader className='relative flex items-center justify-center pt-4 pb-2 px-6 border-b border-[#e3d5c1]'>
            {step === 'booking' && (
              <button
                onClick={() => setStep('cart')}
                className='absolute left-4 top-1/2 -translate-y-1/2 text-[#a08060] hover:text-[#2c1a0e]'
              >
                <ChevronLeft size={20} />
              </button>
            )}
            <SheetTitle className='font-regular text-[1.55rem] font-medium text-[#824C08] text-center w-full'>
              {step === 'cart' ? 'Giỏ Hàng' : 'Xác Nhận Đặt Lịch'}
            </SheetTitle>
          </SheetHeader>

          <div className='flex-1 overflow-y-auto'>
            {step === 'cart' ? (
              <div>
                {groupedItems.map((parent) => (
                  <div key={parent.id}>
                    <div className='flex items-center gap-3 px-5 py-4 border-b border-[#ecdec9]'>
                      <div className='w-[50px] h-[50px] overflow-hidden flex-shrink-0 bg-[#e3d5c1]'>
                        {parent.image && (
                          <img src={parent.image} alt={parent.name} className='w-full h-full object-cover' />
                        )}
                      </div>

                      <div className='flex-1 min-w-0'>
                        <p className='text-[0.88rem] font-semibold text-[#625B5A] mb-0.5'>{parent.name}</p>
                        <div className='flex justify-between items-center'>
                          <p className='text-[0.82rem] text-[#5B616D]'>{formatPrice(parent.price)}</p>
                          {parent.duration && (
                            <div className='flex items-center gap-1 text-[#5B616D]'>
                              <Clock size={11} />
                              <span className='text-[0.76rem]'>{parent.duration} phút</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {parent.hasQuantityControl && (
                        <div className='inline-flex items-center bg-white border border-[#c9af93] rounded-full px-3 py-1.5 gap-2'>
                          <button
                            onClick={() => onUpdateQuantity?.(parent.id, Math.max(1, parent.quantity - 1))}
                            disabled={parent.quantity <= 1}
                            className='text-[#7a5c3e] hover:text-[#2c1a0e] disabled:text-[#d4c9b0] disabled:cursor-not-allowed flex items-center justify-center'
                          >
                            <Minus size={14} strokeWidth={2} />
                          </button>
                          <span className='text-[0.83rem] font-bold text-[#2c1a0e] min-w-[16px] text-center'>
                            {parent.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity?.(parent.id, parent.quantity + 1)}
                            className='text-[#7a5c3e] hover:text-[#2c1a0e] flex items-center justify-center'
                          >
                            <Plus size={14} strokeWidth={2} />
                          </button>
                        </div>
                      )}

                      <button onClick={() => onRemoveItem?.(parent.id)} className='text-[#b8a090] hover:text-[#7a5c3e]'>
                        <X size={14} />
                      </button>
                    </div>

                    {/* render children under parent */}
                    {parent.children.length > 0 && (
                      <div className='pl-6'>
                        {parent.children.map((item) => (
                          <div key={item.id} className='flex items-center gap-3 px-5 py-4 border-b border-[#ecdec9]'>
                            <div className='w-[30px] h-[30px] overflow-hidden flex-shrink-0 bg-[#e3d5c1]'>
                              {item.image && (
                                <img src={item.image} alt={item.name} className='w-full h-full object-cover' />
                              )}
                            </div>

                            <div className='flex-1 flex flex-row min-w-0 gap-x-2'>
                              <p className='font-regular text-[#6e5843c6]'>Hiệu ứng:</p>
                              <p className='text-[0.88rem] font-semibold text-[#2c1a0e]'>{item.name}</p>
                            </div>

                            {item.hasQuantityControl && (
                              <div className='inline-flex items-center  border border-[#625B5A] rounded-full px-3 py-1.5 gap-2'>
                                <button
                                  onClick={() => onUpdateQuantity?.(item.id, Math.max(1, item.quantity - 1))}
                                  disabled={item.quantity <= 1}
                                  className='text-[#625B5A] hover:text-[#2c1a0e] disabled:text-[#d4c9b0] disabled:cursor-not-allowed flex items-center justify-center'
                                >
                                  <Minus size={14} strokeWidth={2} />
                                </button>
                                <span className='text-[0.83rem] font-bold text-[#2c1a0e] min-w-[16px] text-center'>
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => onUpdateQuantity?.(item.id, item.quantity + 1)}
                                  className='text-[#7a5c3e] hover:text-[#2c1a0e] flex items-center justify-center'
                                >
                                  <Plus size={14} strokeWidth={2} />
                                </button>
                              </div>
                            )}

                            <button
                              onClick={() => onRemoveItem?.(item.id)}
                              className='text-[#b8a090] hover:text-[#7a5c3e]'
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className='p-5 flex flex-col gap-6'>
                <div className='space-y-4'>
                  <div>
                    <label className='text-[0.7rem] text-[#a08060] uppercase font-bold tracking-wider'>
                      Tên khách hàng
                    </label>
                    <p className='text-[0.9rem] text-[#2c1a0e] font-semibold border-b border-[#e3d5c1] pb-1'>Thuỳ Đỗ</p>
                  </div>
                  <div>
                    <label className='text-[0.7rem] text-[#a08060] uppercase font-bold tracking-wider'>
                      Số điện thoại
                    </label>
                    <p className='text-[0.9rem] text-[#2c1a0e] font-semibold border-b border-[#e3d5c1] pb-1'>
                      0969-886-969
                    </p>
                  </div>
                </div>

                <div>
                  <label className='text-[0.7rem] text-[#a08060] uppercase font-bold tracking-wider block mb-3'>
                    Chọn ngày
                  </label>
                  <div className='flex gap-2 overflow-x-auto pb-2 scrollbar-hide'>
                    {days.map((d, i) => (
                      <button
                        key={i}
                        disabled={d.disabled}
                        onClick={() => dispatch(setSelectedDate(d.date))}
                        className={`flex flex-col items-center justify-center min-w-[80px] py-3 px-2 rounded-sm transition-all flex-shrink-0 ${
                          selectedDate === d.date
                            ? 'bg-[#F6C649] text-[#2c1a0e]'
                            : 'bg-[#E5E3DC] text-[#625B5A] hover:bg-[#dcd6cc]'
                        } ${d.disabled ? 'opacity-50 cursor-not-allowed hover:bg-[#E5E3DC]' : ''}`}
                      >
                        <span className='text-[0.85rem] font-bold mb-1'>{d.day}</span>
                        <span className='text-[0.75rem]'>{d.date}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className='text-[0.7rem] text-[#B97951] uppercase font-bold tracking-wider block mb-3'>
                    Chọn khung giờ
                  </label>
                  <div className='grid grid-cols-4 gap-2'>
                    {TIME_SLOTS.map((time) => (
                      <button
                        key={time}
                        onClick={() => dispatch(setSelectedTime(time))}
                        className={`py-2 border transition-all flex flex-col items-center ${
                          selectedTime === time
                            ? 'bg-[#b5895a] border-[#b5895a] text-white'
                            : 'bg-[#E5E3DC] border-transparent text-[#625B5A]'
                        } ${time === '09:30 AM' || time === '12:30 PM' ? 'opacity-30' : ''}`}
                      >
                        <span className='font-bold text-sm'>{time.split(' ')[0]}</span>
                        <span className='text-xs'>{time.split(' ')[1]}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className='border-t border-[#e3d5c1] bg-[#f7f0e6]'>
            {step === 'cart' ? (
              <>
                {!showTechnicianList ? (
                  <div
                    className='px-5 py-3 border-b cursor-pointer hover:bg-[#efe6d9] transition-colors'
                    onClick={() => setShowTechnicianList(true)}
                  >
                    <div className='flex justify-between items-center'>
                      <span className='text-[0.83rem] text-[#4a3522] font-medium'>Kỹ thuật viên</span>
                      <div className='flex items-center gap-2'>
                        <div className='flex items-center gap-2'>
                          {technicians[selectedTechnicianIndex]?.avatar && (
                            <img
                              src={technicians[selectedTechnicianIndex].avatar}
                              alt={technicians[selectedTechnicianIndex].name}
                              className='w-6 h-6 rounded-full object-cover'
                            />
                          )}
                          <span className='text-[0.83rem] text-[#2c1a0e] font-medium'>
                            {technicians[selectedTechnicianIndex]?.name}
                          </span>
                        </div>
                        <ChevronRight size={16} className='text-[#a08060]' />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className='border-b border-[#e3d5c1] animate-in fade-in'>
                    <div
                      className='px-5 py-3 cursor-pointer hover:bg-[#efe6d9] transition-colors'
                      onClick={() => setShowTechnicianList(false)}
                    >
                      <div className='flex items-center gap-2 mb-3'>
                        <ChevronRight size={16} className='text-[#a08060] rotate-180' />
                        <span className='text-[0.83rem] text-[#4a3522] font-medium'>Kỹ thuật viên</span>
                      </div>
                      <div className='flex flex-col gap-3'>
                        {technicians.map((tech, idx) => (
                          <div
                            key={idx}
                            className={`flex items-center gap-2 p-2 rounded cursor-pointer hover:bg-[#efe6d9] transition-colors ${
                              selectedTechnicianIndex === idx ? 'bg-[#e8d5a3] border border-[#c9af93]' : ''
                            }`}
                            onClick={() => {
                              dispatch(setSelectedTechnicianIndex(idx))
                              setShowTechnicianList(false)
                            }}
                          >
                            {tech.avatar && (
                              <img src={tech.avatar} alt={tech.name} className='w-7 h-7 rounded-full object-cover' />
                            )}
                            <span className='text-[0.83rem] text-[#2c1a0e] font-medium'>{tech.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                <div className='flex items-center justify-between px-5 py-4'>
                  <span className='text-[0.88rem] text-[#2c1a0e] font-medium'>Tổng thanh toán</span>
                  <span className='text-[1.1rem] text-[#F36363] font-bold'>{formatPrice(total)}</span>
                </div>

                <div className='px-5 py-3'>
                  <button
                    onClick={() => setStep('booking')}
                    className='flex items-center justify-between gap-2 w-full bg-[#824C08] text-[#f7f0e6] py-2 px-5 text-[0.95rem] tracking-wide hover:bg-[#633a06] transition-colors'
                  >
                    Tiếp Tục <ArrowRight size={25} strokeWidth={2.5} />
                  </button>
                </div>
              </>
            ) : (
              <div className='px-5 py-3'>
                <button
                  onClick={handleBooking}
                  className='flex items-center justify-between gap-2 w-full bg-[#824C08] text-[#f7f0e6] py-2 px-5 text-[0.95rem] tracking-wide hover:bg-[#633a06] transition-colors'
                >
                  Đặt Lịch <ArrowRight size={25} strokeWidth={2.5} />
                </button>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
      <SuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
        title='Gửi Yêu Cầu Thành Công!'
        description={
          <>
            Cảm ơn bạn đã đặt dịch vụ tại The OM Lounge. Chúng tôi đã nhận được thông tin đặt lịch từ bạn và sẽ liên hệ
            lại trong thời gian sớm nhất.
          </>
        }
      />
    </>
  )
}
