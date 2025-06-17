import {Bar, BarChart, Tooltip, XAxis, YAxis,} from 'recharts';


export default function MonBarChart({selectedCategorie}) {
    let dataBar = [];


    switch (selectedCategorie) {
        case 'web':
            dataBar = [
                {name: 'js', maitrisé: 85, non_maitrisé: 15},
                {name: 'html', maitrisé: 95, non_maitrisé: 5},
                {name: 'css', maitrisé: 40, non_maitrisé: 60},
                {name: 'symfony', maitrisé: 70, non_maitrisé: 30},
                {name: 'react', maitrisé: 65, non_maitrisé: 35},
            ];
            break;
        case 'applications':
            dataBar = [
                {name: 'java', maitrisé: 85, non_maitrisé: 15},
                {name: 'python', maitrisé: 95, non_maitrisé: 5},
                {name: 'c', maitrisé: 30, non_maitrisé: 70},
            ];
            break;
        case 'projetsPersos':
            dataBar = [
                {name: 'html', maitrisé: 95, non_maitrisé: 5},
                {name: 'css', maitrisé: 40, non_maitrisé: 60},
                {name: 'vue', maitrisé: 60, non_maitrisé: 40},
            ];
            break;
        case 'mobile':
            dataBar = [
                {name: 'kotlin', maitrisé: 40, non_maitrisé: 15},
            ];
            break;
        default :
            dataBar = [
                {name: 'js', maitrisé: 85, non_maitrisé: 15},
                {name: 'html', maitrisé: 95, non_maitrisé: 5},
                {name: 'css', maitrisé: 40, non_maitrisé: 60},
                {name: 'symfony', maitrisé: 70, non_maitrisé: 30},
                {name: 'react', maitrisé: 65, non_maitrisé: 35},
            ];
    }


    return (
        <div id="barChart">
            <h2 className="text-xl font-bold mb-4 text-center">
                niveau de maitrîse
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
                    dataKey="maitrisé"
                    stackId="a"
                    fill="#4ea8de"
                    radius={[10, 0, 0, 10]}
                    barSize={15}
                />
                <Bar
                    dataKey="non_maitrisé"
                    stackId="a"
                    fill="#f87171"
                    radius={[0, 10, 10, 0]}
                    barSize={15}
                />
            </BarChart>
        </div>

)
}
