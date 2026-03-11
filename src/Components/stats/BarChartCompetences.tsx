import {Bar, BarChart, Tooltip, XAxis, YAxis,} from 'recharts';
import {ProjectCategory} from "../../Models/Project.ts";

export type BarChartCompetencesProps = {
    selectedCategorie: ProjectCategory;
}

export default function BarChartCompetences({selectedCategorie}: BarChartCompetencesProps) {
    let dataBar = [];


    switch (selectedCategorie) {
        case 'web':
            dataBar = [
                {name: 'JS', maitrise: 85, non_maitrise: 15},
                {name: 'HTML', maitrise: 95, non_maitrise: 5},
                {name: 'CSS', maitrise: 40, non_maitrise: 60},
                {name: 'Symfony', maitrise: 70, non_maitrise: 30},
                {name: 'React', maitrise: 65, non_maitrise: 35},
            ];
            break;
        case 'applications':
            dataBar = [
                {name: 'Java', maitrise: 85, non_maitrise: 15},
                {name: 'Python', maitrise: 95, non_maitrise: 5},
                {name: 'C', maitrise: 30, non_maitrise: 70},
            ];
            break;
        case 'projetsPersos':
            dataBar = [
                {name: 'HTML', maitrise: 95, non_maitrise: 5},
                {name: 'CSS', maitrise: 40, non_maitrise: 60},
                {name: 'Vue', maitrise: 60, non_maitrise: 40},
            ];
            break;
        case 'mobile':
            dataBar = [
                {name: 'Kotlin', maitrise: 40, non_maitrise: 60},
            ];
            break;
        case 'entreprise':
            dataBar = [
                {name: 'Symfony', maitrise: 70, non_maitrise: 30},
                {name: 'PHP', maitrise: 70, non_maitrise: 30},
                {name: 'bash', maitrise: 20, non_maitrise: 80},
            ];
            break;
        default :
            dataBar = [
                {name: 'JS', maitrise: 85, non_maitrise: 15},
                {name: 'HTML', maitrise: 95, non_maitrise: 5},
                {name: 'CSS', maitrise: 40, non_maitrise: 60},
                {name: 'Symfony', maitrise: 70, non_maitrise: 30},
                {name: 'React', maitrise: 65, non_maitrise: 35},
            ];
    }


    return (
        <div id="barChart">
            <h2 className="text-xl font-bold mb-4 text-center">
                Niveau de maitrîse
            </h2>
            <BarChart
                width={600}
                height={300}
                layout="vertical"
                data={dataBar}
                margin={{top: 20, right: 30, bottom: 20}}
                barCategoryGap={15}
            >
                <XAxis type="number" hide/>
                <YAxis
                    dataKey="name"
                    type="category"
                    tick={{fontSize: 14, fill: "#ffffff"}} // texte Y en blanc si fond foncé
                />
                <Tooltip
                    cursor={false}
                    contentStyle={{
                        backgroundColor: '#0a0a23',
                        borderRadius: '8px',
                        border: 'none',
                        padding: '10px',
                        boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
                    }}
                    itemStyle={{
                        color: '#ffffff',
                        fontSize: '14px',
                    }}
                    labelStyle={{
                        color: '#dddddd',
                        marginBottom: '4px',
                    }}
                />
                <Bar
                    dataKey="maitrise"
                    stackId="a"
                    fill="#4ea8de"
                    radius={[10, 0, 0, 10]}
                    barSize={15}
                />
                <Bar
                    dataKey="non_maitrise"
                    stackId="a"
                    fill="#f87171"
                    radius={[0, 10, 10, 0]}
                    barSize={15}
                />
            </BarChart>
        </div>

)
}
