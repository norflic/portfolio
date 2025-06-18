import '../assets/projet.css';

export default function ProjectCard({ DisplayedProject }) {
    if (!DisplayedProject) return null;
    return (
            <div className="card flex-1 flex flex-col justify-between  items-center text-center  h-96">
                <span>

                    <h3>{DisplayedProject.title}</h3>

                    <span className="w-full aspect-video overflow-hidden mb-2">
                        {DisplayedProject.image &&
                            <img src={DisplayedProject.image} alt='image du projet' className="w-full max-h-3/4  object-contain"/>
                        }
                    </span>
                </span>
                {DisplayedProject.lienSite && (
                    <a href={DisplayedProject.lienSite} target="_blank" rel="noopener noreferrer">
                        lien vers {DisplayedProject.title}
                    </a>
                )}
                <p className="max-w-md whitespace-normal">{DisplayedProject.description}</p>
            </div>
    );
}