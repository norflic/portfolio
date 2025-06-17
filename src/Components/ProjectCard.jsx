import '../assets/projet.css';

export default function ProjectCard({ DisplayedProject }) {
    if (!DisplayedProject) return null;
    return (
            <div className="card flex-1 flex flex-col justify-between">
                <span>
                    <h3>{DisplayedProject.title}</h3>
                <span>
                    {DisplayedProject.image && <img src={DisplayedProject.image} alt='image du projet'  />}
                    {DisplayedProject.lienSite && (
                        <a href={DisplayedProject.lienSite} target="_blank" rel="noopener noreferrer">
                            lien vers {DisplayedProject.title}
                        </a>
                    )}
                </span>

                </span>
                <p>{DisplayedProject.description}</p>
            </div>
    );
}