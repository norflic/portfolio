import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import {Project} from "../../Models/Project.ts";


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

export type MonPieChartsProps = {
    selectedProjects: Project[]
}

type datePieType = {
    name: string,
    value: number
}[]

export default function MonPieChart({selectedProjects}:  MonPieChartsProps) {
    const dataPie: datePieType = []
    if (Array.isArray(selectedProjects)) {
        selectedProjects.forEach(project => {
            const temps = project.data?.time || 0;
            dataPie.push({ name: project.title, value: temps });
        });
    } else {
        console.error("les statistiques ne sont pas un array");
    }

    return (
            <div id="pieChart" >
                <h2 className="text-l font-bold mb-4 text-center">
                    Temps passé par projet
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
                        {dataPie.map((_entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </div>
    );
}
