"use client"

import { Facebook, Link } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"

interface ShareButtonsProps {
  title?: string
  url?: string
  image?: string
  className?: string
}

export default function ShareButtons({ title = "", url = "", image = "", className = "" }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false)
  const { t } = useLanguage()

  // Get the current URL if none is provided
  const currentUrl = url || (typeof window !== "undefined" ? window.location.href : "")

  // Ensure the URL has the protocol
  const shareUrl = currentUrl.startsWith("http") ? currentUrl : `https://${currentUrl}`

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    window.open(facebookUrl, "_blank", "width=600,height=400")
  }

  const shareOnTwitter = () => {
    const twitterText = title ? `${title}` : ""
    const twitterUrl = `https://x.com/intent/tweet?text=${encodeURIComponent(twitterText)}&url=${encodeURIComponent(shareUrl)}`
    window.open(twitterUrl, "_blank", "width=600,height=400")
  }

  const shareOnMessenger = () => {
    // Χρησιμοποιούμε το σωστό URL για το Messenger
    const messengerUrl = `fb-messenger://share/?link=${encodeURIComponent(shareUrl)}`

    // Εναλλακτικό URL για desktop
    const webMessengerUrl = `https://www.facebook.com/dialog/send?app_id=936619743392459&link=${encodeURIComponent(
      shareUrl,
    )}&redirect_uri=${encodeURIComponent(shareUrl)}`

    // Έλεγχος αν είναι mobile συσκευή
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    if (isMobile) {
      // Δοκιμάζουμε το native app URL
      window.location.href = messengerUrl

      // Fallback σε περίπτωση που δεν ανοίξει το app μετά από 1 δευτερόλεπτο
      setTimeout(() => {
        window.open(webMessengerUrl, "_blank")
      }, 1000)
    } else {
      // Σε desktop ανοίγουμε το web URL
      window.open(webMessengerUrl, "_blank", "width=600,height=400")
    }
  }

  const shareOnViber = () => {
    // Δημιουργούμε το μήνυμα για διαμοιρασμό
    const message = `${title} ${shareUrl}`

    // Χρησιμοποιούμε το πρωτόκολλο του Viber για κινητές συσκευές
    const viberUrl = `viber://forward?text=${encodeURIComponent(message)}`

    // Εναλλακτικό URL για desktop (ανοίγει το Viber Web)
    const webViberUrl = `https://viber.com/share?text=${encodeURIComponent(message)}`

    // Έλεγχος αν είναι mobile συσκευή
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)

    if (isMobile) {
      // Δοκιμάζουμε το native app URL
      window.location.href = viberUrl

      // Fallback σε περίπτωση που δεν ανοίξει το app μετά από 1 δευτερόλεπτο
      setTimeout(() => {
        window.open(webViberUrl, "_blank")
      }, 1000)
    } else {
      // Σε desktop ανοίγουμε το web URL
      window.open(webViberUrl, "_blank", "width=600,height=400")
    }
  }

  const shareOnWhatsApp = () => {
    // Δημιουργούμε το μήνυμα για διαμοιρασμό
    const message = `${title} ${shareUrl}`

    // Το URL για διαμοιρασμό στο WhatsApp (λειτουργεί και σε desktop και σε mobile)
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`

    // Ανοίγουμε το URL
    window.open(whatsappUrl, "_blank")
  }
  
  // Χρήση του Web Share API για native sharing
  const useNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: title,
        url: shareUrl,
      })
      .then(() => console.log('Successful share'))
      .catch((error) => {
        console.log('Error sharing:', error);
      });
    } else {
      // Fallback για browsers που δεν υποστηρίζουν το Web Share API
      // Αντιγραφή στο πρόχειρο ως fallback
      copyToClipboard();
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl).then(
      () => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      },
      (err) => {
        console.error("Αποτυχία αντιγραφής: ", err)
      },
    )
  }

  return (
    <div className={`${className}`}>
      {/* School Notebook Paper Background */}
      <div className="relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl shadow-xl border-2 border-blue-200/30 dark:border-blue-700/30 overflow-hidden p-6">
        {/* Notebook Lines Background */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Horizontal lines */}
          {[...Array(8)].map((_, i) => (
            <div
              key={`line-${i}`}
              className={`absolute w-full h-px ${
                'bg-blue-300/15 dark:bg-blue-300/15'
              }`}
              style={{
                top: `${20 + i * 8}%`,
                left: '8%',
                right: '4%'
              }}
            />
          ))}
          
          {/* Red margin line */}
          <div className={`absolute left-8 top-0 bottom-0 w-px ${
            'bg-red-400/30 dark:bg-red-400/30'
          }`}></div>
          
          {/* Holes for binder */}
          {[...Array(4)].map((_, i) => (
            <div
              key={`hole-${i}`}
              className={`absolute w-1.5 h-1.5 rounded-full border ${
                'bg-blue-200/50 border-blue-300/70 dark:bg-gray-600/30 dark:border-gray-500/50'
              }`}
              style={{
                left: '4px',
                top: `${25 + i * 18}%`
              }}
            />
          ))}
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* School Header */}
          <div className="flex items-center justify-center gap-3 mb-6">
            {/* School Badge */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg border-2 border-white/30">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.803 5.33333C13.803 3.49238 15.3022 2 17.1515 2C19.0008 2 20.5 3.49238 20.5 5.33333C20.5 7.17428 19.0008 8.66667 17.1515 8.66667C16.2177 8.66667 15.3738 8.28596 14.7671 7.67347L10.1317 10.8295C10.1745 11.0425 10.197 11.2625 10.197 11.4872C10.197 11.9322 10.109 12.3576 9.94959 12.7464L15.0323 16.0858C15.6092 15.6161 16.3473 15.3333 17.1515 15.3333C19.0008 15.3333 20.5 16.8257 20.5 18.6667C20.5 20.5076 19.0008 22 17.1515 22C15.3022 22 13.803 20.5076 13.803 18.6667C13.803 18.1845 13.9062 17.7255 14.0917 17.3111L9.05007 13.9987C8.46196 14.5098 7.6916 14.8205 6.84848 14.8205C4.99917 14.8205 3.5 13.3281 3.5 11.4872C3.5 9.64623 4.99917 8.15385 6.84848 8.15385C7.9119 8.15385 8.85853 8.64725 9.47145 9.41518L13.9639 6.35642C13.8594 6.03359 13.803 5.6896 13.803 5.33333Z" fill="#ffffff"></path>
                </svg>
              </div>
              {/* Grade A+ Badge */}
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-white shadow-md">
                <span className="text-white text-xs font-bold" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                  A+
                </span>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                Μοιραστείτε το Άρθρο
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400" style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                Κάντε κλικ για να μοιραστείτε με φίλους
              </p>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={shareOnFacebook}
              className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border-2 border-blue-200/50 dark:border-blue-700/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              aria-label="Μοιραστείτε στο Facebook"
            >
              {/* Notebook Lines Background */}
              <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute w-full h-px ${
                  'bg-blue-300/10 dark:bg-blue-300/10'
                }`} style={{ top: '50%', left: '10%', right: '10%' }}></div>
                <div className={`absolute left-3 top-0 bottom-0 w-px ${
                  'bg-red-400/20 dark:bg-red-400/20'
                }`}></div>
              </div>
              
              <div className="relative z-10 flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#1877F2] to-[#0e5fc2] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Facebook className="w-4 h-4 text-white" />
                </div>
              </div>
            </button>

            <button
              onClick={shareOnTwitter}
              className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border-2 border-blue-200/50 dark:border-blue-700/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              aria-label="Μοιραστείτε στο X (Twitter)"
            >
              {/* Notebook Lines Background */}
              <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute w-full h-px ${
                  'bg-blue-300/10 dark:bg-blue-300/10'
                }`} style={{ top: '50%', left: '10%', right: '10%' }}></div>
                <div className={`absolute left-3 top-0 bottom-0 w-px ${
                  'bg-red-400/20 dark:bg-red-400/20'
                }`}></div>
              </div>
              
              <div className="relative z-10 flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#000000] to-[#333333] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256" className="h-4 w-4">
                    <g fill="#ffffff" fillRule="nonzero" stroke="none" strokeWidth="1" strokeLinecap="butt" strokeLinejoin="miter" strokeMiterlimit="10" strokeDasharray="" strokeDashoffset="0" fontFamily="none" fontWeight="none" fontSize="none" textAnchor="start" style={{mixBlendMode: "normal"}}>
                      <g transform="scale(5.12,5.12)">
                        <path d="M11,4c-3.866,0 -7,3.134 -7,7v28c0,3.866 3.134,7 7,7h28c3.866,0 7,-3.134 7,-7v-28c0,-3.866 -3.134,-7 -7,-7zM13.08594,13h7.9375l5.63672,8.00977l6.83984,-8.00977h2.5l-8.21094,9.61328l10.125,14.38672h-7.93555l-6.54102,-9.29297l-7.9375,9.29297h-2.5l9.30859,-10.89648zM16.91406,15l14.10742,20h3.06445l-14.10742,-20z"></path>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </button>

            <button
              onClick={shareOnMessenger}
              className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border-2 border-blue-200/50 dark:border-blue-700/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              aria-label="Μοιραστείτε στο Messenger"
            >
              {/* Notebook Lines Background */}
              <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute w-full h-px ${
                  'bg-blue-300/10 dark:bg-blue-300/10'
                }`} style={{ top: '50%', left: '10%', right: '10%' }}></div>
                <div className={`absolute left-3 top-0 bottom-0 w-px ${
                  'bg-red-400/20 dark:bg-red-400/20'
                }`}></div>
              </div>
              
              <div className="relative z-10 flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#0099FF] to-[#5F5DFE] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4">
                    <path
                      d="M17.3 9.6C17.6314 9.15817 17.5418 8.53137 17.1 8.2C16.6582 7.86863 16.0314 7.95817 15.7 8.4L13.3918 11.4776L11.2071 9.29289C11.0021 9.08791 10.7183 8.98197 10.4291 9.00252C10.1399 9.02307 9.87393 9.16809 9.7 9.4L6.7 13.4C6.36863 13.8418 6.45817 14.4686 6.9 14.8C7.34183 15.1314 7.96863 15.0418 8.3 14.6L10.6082 11.5224L12.7929 13.7071C12.9979 13.9121 13.2817 14.018 13.5709 13.9975C13.8601 13.9769 14.1261 13.8319 14.3 13.6L17.3 9.6Z"
                      fill="#ffffff"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 23C10.7764 23 10.0994 22.8687 9 22.5L6.89443 23.5528C5.56462 24.2177 4 23.2507 4 21.7639V19.5C1.84655 17.492 1 15.1767 1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23ZM6 18.6303L5.36395 18.0372C3.69087 16.4772 3 14.7331 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C11.0143 21 10.552 20.911 9.63595 20.6038L8.84847 20.3397L6 21.7639V18.6303Z"
                      fill="#ffffff"
                    />
                  </svg>
                </div>
              </div>
            </button>

            <button
              onClick={shareOnWhatsApp}
              className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border-2 border-blue-200/50 dark:border-blue-700/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              aria-label="Μοιραστείτε στο WhatsApp"
            >
              {/* Notebook Lines Background */}
              <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute w-full h-px ${
                  'bg-blue-300/10 dark:bg-blue-300/10'
                }`} style={{ top: '50%', left: '10%', right: '10%' }}></div>
                <div className={`absolute left-3 top-0 bottom-0 w-px ${
                  'bg-red-400/20 dark:bg-red-400/20'
                }`}></div>
              </div>
              
              <div className="relative z-10 flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#25D366] to-[#128C7E] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" className="h-4 w-4">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
              </div>
            </button>

            <button
              onClick={shareOnViber}
              className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border-2 border-blue-200/50 dark:border-blue-700/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              aria-label="Μοιραστείτε στο Viber"
            >
              {/* Notebook Lines Background */}
              <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute w-full h-px ${
                  'bg-blue-300/10 dark:bg-blue-300/10'
                }`} style={{ top: '50%', left: '10%', right: '10%' }}></div>
                <div className={`absolute left-3 top-0 bottom-0 w-px ${
                  'bg-red-400/20 dark:bg-red-400/20'
                }`}></div>
              </div>
              
              <div className="relative z-10 flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#7D3DAF] to-[#5F259F] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <svg
                    viewBox="0 0 455.731 455.731"
                    fill="#ffffff"
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g>
                      <path d="M371.996,146.901l-0.09-0.36c-7.28-29.43-40.1-61.01-70.24-67.58l-0.34-0.07 c-48.75-9.3-98.18-9.3-146.92,0l-0.35,0.07c-30.13,6.57-62.95,38.15-70.24,67.58l-0.08,0.36c-9,41.1-9,82.78,0,123.88l0.08,0.36 c6.979,28.174,37.355,58.303,66.37,66.589v32.852c0,11.89,14.49,17.73,22.73,9.15l33.285-34.599 c7.219,0.404,14.442,0.629,21.665,0.629c24.54,0,49.09-2.32,73.46-6.97l0.34-0.07c30.14-6.57,62.96-38.15,70.24-67.58l0.09-0.36 C380.996,229.681,380.996,188.001,371.996,146.901z M345.656,264.821c-4.86,19.2-29.78,43.07-49.58,47.48 c-25.921,4.929-52.047,7.036-78.147,6.313c-0.519-0.014-1.018,0.187-1.38,0.559c-3.704,3.802-24.303,24.948-24.303,24.948 l-25.85,26.53c-1.89,1.97-5.21,0.63-5.21-2.09v-54.422c0-0.899-0.642-1.663-1.525-1.836c-0.005-0.001-0.01-0.002-0.015-0.003 c-19.8-4.41-44.71-28.28-49.58-47.48c-8.1-37.15-8.1-74.81,0-111.96c4.87-19.2,29.78-43.07,49.58-47.48 c45.27-8.61,91.17-8.61,136.43,0c19.81,4.41,44.72,28.28,49.58,47.48C353.765,190.011,353.765,227.671,345.656,264.821z" />
                      <path d="M270.937,289.942c-3.044-0.924-5.945-1.545-8.639-2.663 c-27.916-11.582-53.608-26.524-73.959-49.429c-11.573-13.025-20.631-27.73-28.288-43.292c-3.631-7.38-6.691-15.049-9.81-22.668 c-2.844-6.948,1.345-14.126,5.756-19.361c4.139-4.913,9.465-8.673,15.233-11.444c4.502-2.163,8.943-0.916,12.231,2.9 c7.108,8.25,13.637,16.922,18.924,26.485c3.251,5.882,2.359,13.072-3.533,17.075c-1.432,0.973-2.737,2.115-4.071,3.214 c-1.17,0.963-2.271,1.936-3.073,3.24c-1.466,2.386-1.536,5.2-0.592,7.794c7.266,19.968,19.513,35.495,39.611,43.858 c3.216,1.338,6.446,2.896,10.151,2.464c6.205-0.725,8.214-7.531,12.562-11.087c4.25-3.475,9.681-3.521,14.259-0.624 c4.579,2.898,9.018,6.009,13.43,9.153c4.331,3.086,8.643,6.105,12.638,9.623c3.841,3.383,5.164,7.821,3.001,12.412 c-3.96,8.408-9.722,15.403-18.034,19.868C276.387,288.719,273.584,289.127,270.937,289.942 C267.893,289.017,273.584,289.127,270.937,289.942z" />
                      <path d="M227.942,131.471c36.515,1.023,66.506,25.256,72.933,61.356c1.095,6.151,1.485,12.44,1.972,18.683 c0.205,2.626-1.282,5.121-4.116,5.155c-2.927,0.035-4.244-2.414-4.434-5.039c-0.376-5.196-0.637-10.415-1.353-15.568 c-3.78-27.201-25.47-49.705-52.545-54.534c-4.074-0.727-8.244-0.918-12.371-1.351c-2.609-0.274-6.026-0.432-6.604-3.675 c-0.485-2.719,1.81-4.884,4.399-5.023C226.527,131.436,227.235,131.468,227.942,131.471 C264.457,132.494,227.235,131.468,227.942,131.471z" />
                      <path d="M283.434,203.407c-0.06,0.456-0.092,1.528-0.359,2.538c-0.969,3.666-6.527,4.125-7.807,0.425 c-0.379-1.098-0.436-2.347-0.438-3.529c-0.013-7.734-1.694-15.46-5.594-22.189c-4.009-6.916-10.134-12.73-17.318-16.248 c-4.344-2.127-9.042-3.449-13.803-4.237c-2.081-0.344-4.184-0.553-6.275-0.844c-2.534-0.352-3.887-1.967-3.767-4.464 c0.112-2.34,1.822-4.023,4.372-3.879c8.38,0.476,16.474,2.287,23.924,6.232c15.15,8.023,23.804,20.687,26.33,37.597 c0.114,0.766,0.298,1.525,0.356,2.294C283.198,199.002,283.288,200.903,283.434,203.407 C283.374,203.863,283.288,200.903,283.434,203.407z" />
                      <path d="M260.722,202.523c-3.055,0.055-4.69-1.636-5.005-4.437c-0.219-1.953-0.392-3.932-0.858-5.832 c-0.918-3.742-2.907-7.21-6.055-9.503c-1.486-1.083-3.17-1.872-4.934-2.381c-2.241-0.647-4.568-0.469-6.804-1.017 c-2.428-0.595-3.771-2.561-3.389-4.839c0.347-2.073,2.364-3.691,4.629-3.527c14.157,1.022,24.275,8.341,25.719,25.007 c0.102,1.176,0.222,2.419-0.039,3.544C263.539,201.464,262.113,202.429,260.722,202.523 C257.667,202.578,262.113,202.429,260.722,202.523z" />
                    </g>
                  </svg>
                </div>
              </div>
            </button>

            <button
              onClick={useNativeShare}
              className="group relative bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-2xl border-2 border-blue-200/50 dark:border-blue-700/50 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              aria-label="Μοιραστείτε με άλλη εφαρμογή"
            >
              {/* Notebook Lines Background */}
              <div className="absolute inset-0 pointer-events-none">
                <div className={`absolute w-full h-px ${
                  'bg-blue-300/10 dark:bg-blue-300/10'
                }`} style={{ top: '50%', left: '10%', right: '10%' }}></div>
                <div className={`absolute left-3 top-0 bottom-0 w-px ${
                  'bg-red-400/20 dark:bg-red-400/20'
                }`}></div>
              </div>
              
              <div className="relative z-10 flex items-center gap-3 px-4 py-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] rounded-full flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white">
                    <g>
                      <path fillRule="evenodd" clipRule="evenodd" d="M13.803 5.33333C13.803 3.49238 15.3022 2 17.1515 2C19.0008 2 20.5 3.49238 20.5 5.33333C20.5 7.17428 19.0008 8.66667 17.1515 8.66667C16.2177 8.66667 15.3738 8.28596 14.7671 7.67347L10.1317 10.8295C10.1745 11.0425 10.197 11.2625 10.197 11.4872C10.197 11.9322 10.109 12.3576 9.94959 12.7464L15.0323 16.0858C15.6092 15.6161 16.3473 15.3333 17.1515 15.3333C19.0008 15.3333 20.5 16.8257 20.5 18.6667C20.5 20.5076 19.0008 22 17.1515 22C15.3022 22 13.803 20.5076 13.803 18.6667C13.803 18.1845 13.9062 17.7255 14.0917 17.3111L9.05007 13.9987C8.46196 14.5098 7.6916 14.8205 6.84848 14.8205C4.99917 14.8205 3.5 13.3281 3.5 11.4872C3.5 9.64623 4.99917 8.15385 6.84848 8.15385C7.9119 8.15385 8.85853 8.64725 9.47145 9.41518L13.9639 6.35642C13.8594 6.03359 13.803 5.6896 13.803 5.33333Z" fill="currentColor"></path>
                    </g>
                  </svg>
                </div>
              </div>
            </button>
          </div>

          {/* School Footer */}
          <div className="mt-6 pt-4 border-t border-blue-200/50 dark:border-blue-700/50">
            <div className="flex items-center justify-center gap-2 text-xs text-slate-600 dark:text-slate-400">
              <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-2 h-2 text-white">
                  <path fillRule="evenodd" clipRule="evenodd" d="M13.803 5.33333C13.803 3.49238 15.3022 2 17.1515 2C19.0008 2 20.5 3.49238 20.5 5.33333C20.5 7.17428 19.0008 8.66667 17.1515 8.66667C16.2177 8.66667 15.3738 8.28596 14.7671 7.67347L10.1317 10.8295C10.1745 11.0425 10.197 11.2625 10.197 11.4872C10.197 11.9322 10.109 12.3576 9.94959 12.7464L15.0323 16.0858C15.6092 15.6161 16.3473 15.3333 17.1515 15.3333C19.0008 15.3333 20.5 16.8257 20.5 18.6667C20.5 20.5076 19.0008 22 17.1515 22C15.3022 22 13.803 20.5076 13.803 18.6667C13.803 18.1845 13.9062 17.7255 14.0917 17.3111L9.05007 13.9987C8.46196 14.5098 7.6916 14.8205 6.84848 14.8205C4.99917 14.8205 3.5 13.3281 3.5 11.4872C3.5 9.64623 4.99917 8.15385 6.84848 8.15385C7.9119 8.15385 8.85853 8.64725 9.47145 9.41518L13.9639 6.35642C13.8594 6.03359 13.803 5.6896 13.803 5.33333Z" fill="#ffffff"></path>
                </svg>
              </div>
              <span style={{ fontFamily: 'StampatelloFaceto, cursive' }}>
                {t('share.clickToShare') || 'Κάντε κλικ σε οποιοδήποτε κουμπί για να μοιραστείτε το άρθρο'}
              </span>
            </div>
          </div>
        </div>
        
        {/* School Corner Decorations */}
        <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-blue-400 opacity-60"></div>
        <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-green-400 opacity-60"></div>
        <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-yellow-400 opacity-60"></div>
        <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-red-400 opacity-60"></div>
      </div>
    </div>
  )
}
