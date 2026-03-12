import * as React from "react"
import { ShoppingCart } from "lucide-react"
import { CartModal } from "~/components/cart-modal"
import { useAppDispatch, useAppSelector } from "~/redux/hooks"
import { setCartOpen, updateQuantity, removeItem } from "~/redux/slices/cartSlice"
import { useTranslation } from "react-i18next"

interface HeaderProps {
  cartItems?: any[]
  externalCartOpen?: boolean
  onExternalCartOpenChange?: (open: boolean) => void
}

export function Header({ externalCartOpen, onExternalCartOpenChange }: HeaderProps) {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.cart.items)
  const reduxCartOpen = useAppSelector((state) => state.cart.isOpen)

  const isControlled = externalCartOpen !== undefined
  const cartOpen = isControlled ? externalCartOpen : reduxCartOpen
  const handleSetCartOpen = (open: boolean) => {
    if (isControlled) {
      onExternalCartOpenChange?.(open)
    } else {
      dispatch(setCartOpen(open))
    }
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }))
  }

  const handleRemoveItem = (id: string) => {
    dispatch(removeItem(id))
  }

  const cartCount = items.reduce((sum, item) => (!item.parentId ? sum + item.quantity : sum), 0)
  const [showHeader, setShowHeader] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setShowHeader(window.scrollY > 200 || cartOpen)
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [cartOpen])

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[100] bg-[#2A261C]/95 backdrop-blur-md border-b border-white/5"
        style={{
          fontFamily: "'Be Vietnam Pro', sans-serif",
          transform: showHeader ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <div className="flex items-center justify-between px-10 py-3">
          <div className="flex-shrink-0">
            <img src="/theOmLounge.png" alt="Logo" className="h-11 w-auto" />
          </div>

          <nav className="flex-1 mx-8">
            <ul className="flex justify-center items-center gap-9 list-none m-0 p-0">
              {[
                { label: t('home'), value: 'Trang chủ' },
                { label: t('about'), value: 'Giới thiệu' },
                { label: t('services'), value: 'Dịch vụ' },
                { label: t('news'), value: 'Tin tức' },
                { label: t('contact'), value: 'Liên hệ' }
              ].map((item) => (
                <li
                  key={item.value}
                  className={`text-[0.83rem] cursor-pointer transition-all duration-300 relative pb-2
                    ${item.value === 'Dịch vụ'
                      ? 'font-semibold text-[#E1C084] after:content-[""] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-[#e8d5a3]'
                      : 'font-light text-[#E1C084] hover:text-[#E1C084] hover:after:content-[""] hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:right-0 hover:after:h-[1px] hover:after:bg-[#e8d5a3]'}
                  `}
                >
                  {item.label}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-6">
            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'vi' ? 'en' : 'vi')}
              className="text-[0.78rem] text-white uppercase tracking-widest font-light hover:text-[#e8d5a3] transition-colors"
            >
              {i18n.language === 'vi' ? 'English' : 'Tiếng Việt'}
            </button>
            <button
              onClick={() => handleSetCartOpen(true)}
              className="flex items-center w-[170px] justify-center gap-2 bg-[#FCE48C] border border-[#FCE48C] px-4 py-[7px] text-[0.78rem] font-semibold uppercase tracking-wider rounded-sm transition-opacity hover:opacity-90"
            >
              <ShoppingCart size={15} className="text-[#824C08]" />
              <span className="text-[#824C08]">{t('cart')}</span>
              {cartCount > 0 && (
                <span className="bg-[#824C08] text-white rounded-full w-5 h-5 flex items-center justify-center text-[0.7rem] font-bold ml-1">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <CartModal
        open={cartOpen}
        onOpenChange={handleSetCartOpen}
        items={items}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </>
  )
}