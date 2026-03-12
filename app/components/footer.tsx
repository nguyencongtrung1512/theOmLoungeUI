import React from 'react'
import flowerImg from '/public/flower.png';
import Btn from '/public/btn.svg';
function Footer() {
  return (
    <div><footer className="w-full bg-[#2C2416] text-[#C9B07A]">
      <div className=" mx-auto grid grid-cols-4 gap-8 relative">
        <div className="flex flex-col px-10 py-10 items-start justify-start">
          <img src="/theOmLounge.png" alt="The OM Lounge" className="w-40 h-20 object-contain mb-3" />
        </div>

        <div className="col-span-1 px-10 py-10 ml-20">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9B07A] inline-block" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9B07A]/70">Sitemap</span>
          </div>
          <ul className="space-y-2 text-sm font-regular">
            <li className="hover:text-[#C9B07A] text-white transition-colors uppercase cursor-pointer">Trang chủ</li>
            <li className="hover:text-[#C9B07A] text-white transition-colors uppercase cursor-pointer">Giới thiệu</li>
            <li className="hover:text-[#C9B07A] text-white transition-colors uppercase cursor-pointer">Dịch vụ</li>
          </ul>
        </div>

        <div className="col-span-1 pt-17 ml-10 ">
          <ul className="space-y-2 text-sm font-regular">
            <li className="hover:text-[#C9B07A] text-white transition-colors uppercase cursor-pointer">Tin tức</li>
            <li className="hover:text-[#C9B07A] text-white transition-colors uppercase cursor-pointer">Liên hệ</li>
          </ul>
        </div>

        <div className="absolute right-0 top-0 h-full flex items-start justify-end pointer-events-none">
          <img src={flowerImg} alt="hoa" className="w-28 h-28 object-contain opacity-80" />
        </div>
      </div>

  <div className="max-w-7xl mx-auto grid grid-cols-4 gap-8 items-center">
        
        <div /> 

        <div className="col-span-1  ml-16">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C9B07A] inline-block" />
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9B07A]/70">Liên hệ</span>
          </div>
          <div className="space-y-2 text-sm text-white">
            <p className="font-medium tracking-wider">+84 89 812 12 97</p>
            <p className="leading-relaxed">
              6 Đường G, Phú Mỹ, Quận 7, TP Hồ Chí Minh<br />
              <span>(gần Crescent Mall)</span>
            </p>
            <div className="pt-1 space-y-1">
              <p>Thứ 2 - Thứ 6: &nbsp;&nbsp;&nbsp;09:00 - 19:00</p>
              <p>Thứ 7 - Chủ nhật: 09:00 - 20:00</p>
            </div>
          </div>
        </div>

        <div className="col-span-2 flex justify-start items-center ml-10">
          <button className="cursor-pointer hover:opacity-100 transition-opacity">
            <img src={Btn} alt="Đặt lịch ngay" className="w-58 h-58 object-contain opacity-80" />
          </button>
        </div>

      </div>
    </footer></div>
  )
}

export default Footer