export default function BtnDownload() {
    return (
        <button className="flex flex-row flex1" id="btn_cv">
            <a href="public/CV_Nils_DERRIEN.pdf" download="CV de nils Derrien.pdf">
                Télecharger mon CV

            </a>
            <img src="public/icone.svg" alt={""}/>
        </button>
    )
}