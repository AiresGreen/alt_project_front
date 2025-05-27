import {Link} from "react-router-dom";


export default function FooterBar() {



    return (
<>
    <div className="mb-2 space-x-4">
        <Link to="src/pages/footer/AproposPage.tsx"
              className="hover:underline">
            À propos
        </Link>
        <Link to="src/pages/footer/ContactPage.tsx"
              className="hover:underline">
            Contact
        </Link>
        <Link to="src/pages/footer/MentionsLegalePage.tsx"
              className="hover:underline">
            Mentions légales
        </Link>
    </div>
    <p className={"text-black"}>© 2024 BalanceTonJob – Créé par JM &amp; Vladou. Open-source sous licence.</p>
</>
    )
}