// src/Components/Header.tsx

export default function Header() {
    return (
        <header>
            <nav className="flex justify-center items-center my-2 gap-12">
                <button id="btn_web">Web</button>
                <div className="h-6 w-px bg-gray-300"></div> {/* barre verticale */}
                <button id="btn_appli">Applications</button>
                <div className="h-6 w-px bg-gray-300"></div> {/* barre verticale */}
                <button id="btn_projets_persos">Projets persos</button>
                <div className="h-6 w-px bg-gray-300"></div> {/* barre verticale */}
                <button id="btn_mobile">Mobile</button>
            </nav>
        </header>
    );
}
