export default function Header() {
    return (
        <>
            <header className="fixed w-full h-20 bg-black/80 flex justify-center z-50 ">
                <nav className="flex top-0 right-0  justify-center items-center my-2 gap-12 ">
                    <button className="dark_outline" id="btn_web">Web</button>
                    <hr className="h-6 w-px bg-gray-300"></hr>
                    <button className="dark_outline" id="btn_appli">Applications</button>
                    <hr className="h-6 w-px bg-gray-300"></hr>
                    <button className="dark_outline" id="btn_projets_persos">Projets persos</button>
                    <hr className="h-6 w-px bg-gray-300"></hr>
                    <button className="dark_outline" id="btn_mobile">Mobile</button>
                    <hr className="h-6 w-px bg-gray-300"></hr>
                    <button className="dark_outline" id="btn_entreprise">Entreprise</button>
                </nav>
            </header>
            <hr className="h-20">
            {/*    placeholder*/}
            </hr>

        </>

);
}

