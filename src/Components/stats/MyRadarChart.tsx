import {PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart, ResponsiveContainer,} from 'recharts';


export default function MyRadarChart() {
    let dataBar = [
        {name: 'communication', maitrise: 75},
        {name: 'gestion de projet', maitrise: 85},
        {name: 'langues', maitrise: 90},
        {name: 'algorithmie', maitrise: 70},
        {name: 'autonomie', maitrise: 90},
    ];

    return (
        <div className="w-full h-96 flex flex-col items-center justify-center p-l-80">
            <h2 className="text-l font-bold mb-4 text-center">Compétences trasversales</h2>
            <ResponsiveContainer>
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={dataBar}>
                    <PolarGrid/>
                    <PolarAngleAxis
                        dataKey="name"
                        tick={{fill: '#ffffff', fontSize: 18}}
                    />
                    <PolarRadiusAxis angle={14} domain={[0, 100]}/>
                    <Radar
                        name="Maîtrise"
                        dataKey="maitrise"
                        stroke="#8884d8"
                        fill="#8884d8"
                        fillOpacity={0.6}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    )
}
