interface StatCardProps {
    title: string;
    value: number;
    color: string;
}

export default function StatCard({
    title,
    value,
    color
}: StatCardProps) {

    return (

        <div
            className={`bg-white rounded-xl shadow-md p-6 border-l-4 ${color} hover:shadow-xl transition duration-300`}
        >

            <h3 className="text-gray-500 text-sm">

                {title}

            </h3>

            <h1 className="text-4xl font-bold mt-3">

                {value}

            </h1>

        </div>

    );

}