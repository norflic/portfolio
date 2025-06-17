import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { BarChart, Bar, XAxis, YAxis,} from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export default function MonPieChart({selectedProjects}) {
    const dataPie = []


    if (Array.isArray(selectedProjects)) {
        selectedProjects.forEach(project => {
            const temps = project.data?.time || 0;
            dataPie.push({ name: project.title, value: temps });
        });
    } else {
        console.error("les statistiques ne sont pas un array");
    }

    const dataBar = [
        { name: 'js', bleu: 70, rouge: 30 },
        { name: 'html', bleu: 80, rouge: 20 },
        { name: 'css', bleu: 80, rouge: 20 },
        { name: 'symfony', bleu: 50, rouge: 50 },
    ];

    return (
        <div className="w-fit flex">
            <div id="pieChart">
                <h2 className="text-xl font-bold mb-4 text-center">
                    Répartition des projets
                </h2>
                <PieChart width={400} height={300}>
                    <Pie
                        data={dataPie}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label
                    >
                        {dataPie.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>


            <div id="barChart">
                <h2 className="text-xl font-bold mb-4 text-center">
                    niveau de maitrîse
                </h2>
                <BarChart
                    width={400}
                    height={300}
                    layout="vertical"
                    data={dataBar}
                    margin={{ top: 20, right: 30, left: 100, bottom: 20 }}
                    barCategoryGap={15}
                >
                    <XAxis type="number" hide />
                    <YAxis
                        dataKey="name"
                        type="category"
                        tick={{ fontSize: 14, fill: "#ffffff" }} // texte Y en blanc si fond foncé
                        width={100}
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
                        dataKey="bleu"
                        stackId="a"
                        fill="#0088FE"
                        radius={[10, 0, 0, 10]}
                        barSize={15}
                    />
                    <Bar
                        dataKey="rouge"
                        stackId="a"
                        fill="#FF5A5F"
                        radius={[0, 10, 10, 0]}
                        barSize={15}
                    />
                </BarChart>            </div>



        </div>

    );
}
