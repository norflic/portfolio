export default function Header() {
    return (
        <>
            <header className="fixed w-full h-20 bg-black/80 flex justify-center ">
                <nav className="flex top-0 right-0  justify-center items-center my-2 gap-12 ">
                    <button className="dark_outline" id="btn_web">Web</button>
                    <div className="h-6 w-px bg-gray-300"></div> {/* barre verticale */}
                    <button className="dark_outline" id="btn_appli">Applications</button>
                    <div className="h-6 w-px bg-gray-300"></div> {/* barre verticale */}
                    <button className="dark_outline" id="btn_projets_persos">Projets persos</button>
                    <div className="h-6 w-px bg-gray-300"></div> {/* barre verticale */}
                    <button className="dark_outline" id="btn_mobile">Mobile</button>
                </nav>
            </header>
            <div className="h-20">
            {/*    placeholder*/}
            </div>

        </>

);
}

