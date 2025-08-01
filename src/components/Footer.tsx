import { CONFIG } from "../../site.config"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="mt-auto border-t border-typo-light-hr dark:border-typo-dark-hr">
      <div className="max-width-main mx-auto px-[8vw] py-8">
        <p className="text-center text-sm text-typo-light-font-extra dark:text-typo-dark-font-extra">
          Copyright © {CONFIG.since} - {currentYear} {CONFIG.profile.name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}