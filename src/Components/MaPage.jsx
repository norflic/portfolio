export default function MaPage() {
    return (
        <div id="pres_page" className="flex flex-row max-h-40 bg-blue-200">
            <span className="w-auto h-auto flex items-center justify-start mb-0">
                <img className="scale-20" id="head_img" src="/portfolio/header_img/head_img.png" alt=""/>
            </span>
            <span className="flex flex-col gap-2 justify-center flex-1">
                {/*TODO: developper infos*/}
                <h1>Nils Derrien</h1>
                <h2>2eme annee d'etude</h2>
                <h2>spécialité : RA</h2>
                <button className="flex flex-row flex1" id="btn_cv">
                    <a href="/portfolio/header_img/CV_Nils_DERRIEN.pdf" download="CV de nils Derrien.pdf">
                        Télecharger mon CV
                        <img src="/portfolio/header_img/icone.svg" alt={""}/>
                    </a>
                </button>
            </span>
            <style>
                {`
                    #pres_page  {
                        padding : 2 rem;
                    }
                    #pres_page *{
                        color : black;
                    }
                    #btn_cv a{
                        display: flex;
                        gap: 1rem;
                    }
                `}
            </style>
        </div>
    );
}



