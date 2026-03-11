export default function BtnDownload() {
    return (
        <button className="flex flex-row whitespace-nowrap" id="btn_cv">
            <a href="/portfolio/CV_Nils_DERRIEN.pdf" download="CV de nils Derrien.pdf">
                Télechargez mon CV
                <img src="/portfolio/icone.svg" alt={""}/>
            </a>
        </button>
    )
}