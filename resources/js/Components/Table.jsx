export default function Table({ columns, data, actions, emptyMessage }) {
    // Function to get the text color based on the status
    const getStatusColor = status => {
        switch (status.toLowerCase()) {
            case 'completed':
                return 'text-green-800' // Green for completed
            case 'pending':
                return 'text-yellow-800' // Yellow for pending
            case 'in progress':
                return 'text-blue-800' // Blue for in progress
            default:
                return 'text-gray-800' // Default color for other statuses
        }
    }

    return (
        <table className="min-w-full divide-y divide-gray-600">
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th
                            key={index}
                            scope="col"
                            className="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase"
                        >
                            {column.header}
                        </th>
                    ))}
                    {actions && (
                        <th
                            scope="col"
                            className="px-6 py-3 text-end text-xs font-medium text-gray-500 uppercase"
                        >
                            Action
                        </th>
                    )}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {data.length === 0 ? (
                    <tr>
                        <td
                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                            colSpan={columns.length + (actions ? 1 : 0)}
                        >
                            {emptyMessage || 'No data found.'}
                        </td>
                    </tr>
                ) : (
                    data.map((item, rowIndex) => (
                        <tr key={item.id}>
                            {columns.map((column, colIndex) => (
                                <td
                                    key={colIndex}
                                    className={`px-6 py-4 whitespace-nowrap text-sm ${
                                        column.accessor === 'status'
                                            ? getStatusColor(
                                                  item[column.accessor]
                                              )
                                            : 'text-gray-800'
                                    }`}
                                >
                                    {column.render
                                        ? column.render(item)
                                        : item[column.accessor]}
                                </td>
                            ))}
                            {actions && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                    <div className="flex justify-center">
                                        {actions(item)}
                                    </div>
                                </td>
                            )}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    )
}
