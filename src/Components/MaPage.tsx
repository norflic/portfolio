import BtnDownload from "./BtnDownload.tsx";

export default function MaPage() {
    return (
        <div
            id="pres_page"
            className="flex flex-wrap items-center justify-evenly gap-x-[clamp(2rem,8vw,6rem)] gap-y-6 px-[clamp(2rem,6vw,4rem)] py-8"
        >
            <img
                className="h-60 w-auto shrink-0 object-contain"
                id="head_img"
                src="/portfolio/head_img.jpg"
                alt="Portrait de Nils Derrien"
            />
            <div className="flex shrink-0 flex-col gap-2">
                <h1 className="text-5xl">Nils Derrien</h1>
                <h2 className="text-3xl">3ème année d&apos;IUT info</h2>
                <h2 className="text-3xl">Spécialité : RA</h2>
                <BtnDownload />
            </div>

            <section className="flex min-w-[min(100%,280px)] flex-[1_1_24rem] max-w-xl flex-col gap-3">
                <span className="text-center text-2xl">A propos de moi</span>
                <div className="flex flex-col gap-3 text-justify leading-relaxed hyphens-auto">
                    <p>
                        Je finalise ma 3ème année de BUT informatique et à compter d'octobre 2026
                        j'intégrerai à Epitech le Master of science en Intelligence Artifielle.
                        Aussi, j'ai trouvé une alternance à CIMPA pour les 2 années à venir.
                    </p>
                    <p>
                        Je suis sérieux, impliqué et toujours enthousiaste à l&apos;idée de vivre de
                        nouvelles expériences. Mes activités préférées sont le vélo et la plongée
                        sous-marine.
                    </p>
                    <p>
                        Je vous propose de découvrir mes projets en parcourant mon portfolio.
                    </p>
                </div>
            </section>

            <style>
                {`
                    #btn_cv a {
                        display: flex;
                        gap: 1rem;
                    }
                `}
            </style>
        </div>
    );
}
