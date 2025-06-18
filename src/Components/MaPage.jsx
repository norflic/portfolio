export default function MaPage() {
    return (
        <div id="pres_page" className="flex flex-row max-h-80">
            <span className="flex-[0.8]  w-auto h-auto flex items-center justify-start mb-0">
                <img className="scale-40" id="head_img" src="/portfolio/head_img.png" alt=""/>
            </span>
            <span className="flex flex-col gap-2 justify-center w-fit">
                {/*TODO: developper infos*/}
                <h1>Nils Derrien</h1>
                <h2>2ème année d'IUT info</h2>
                <h2>spécialité : RA</h2>
                <button className="flex flex-row whitespace-nowrap" id="btn_cv">
                    <a href="/portfolio/CV_Nils_DERRIEN.pdf" download="CV de nils Derrien.pdf">
                        Télechargez mon CV
                        <img src="/portfolio/icone.svg" alt={""}/>
                    </a>
                </button>
            </span>
            <span className="flex-[1.2] flex flex-col gap-6 justify-center items-center text-center">
                <span className="">à propos de moi</span>
                <p className="flex flex-col items-center mb-0">
                    <span>
                        Actuellement en recherche d'une alternance pour ma 3ème année de BUT.
                    </span>
                    <span>
                        Je suis quelqu'un de sérieux, impliqué et je suis toujours enthousiaste à <br/> l'idée de vivre de nouvelles expériences.

                    </span>
                    <span>
                        Mes activités préférées sont le vélo, la plngée et l'apéro
                    </span>
                    <span>
                        Je vous propose de découvrir mes projets par vous même

                    </span>
                </p>
            </span>
            <style>
                {`
                    #pres_page  {
                        padding : 2 rem;
                    }
                    #btn_cv a{
                        display: flex;
                        gap: 1rem;
                    }
                    h1 {
                        font-size: 3rem;
                    }
                    h2 {
                        font-size: 2rem;
                    }
                `}
            </style>
        </div>
    );
}



