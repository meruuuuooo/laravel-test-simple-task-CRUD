import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import Table from '@/Components/Table'
import Pagination from '@/Components/Pagination'
import { Head, Link, router } from '@inertiajs/react'
import swal from 'sweetalert'
import { useState, useEffect } from 'react'
import { PlusCircleIcon } from '@heroicons/react/24/solid'
import { PencilSquareIcon } from '@heroicons/react/24/solid'
import { TrashIcon } from '@heroicons/react/24/solid'
import DropdownMenu from '@/Components/DropdownMenu'

export default function Index({ auth, tasks, alltasks }) {
    const [search, setSearch] = useState('')
    const [filteredTasks, setFilteredTasks] = useState(tasks.data)
    const [filterType, setFilterType] = useState('Title')

    const menuItems = [
        {
            label: 'All',
            href: '#',
            onClick: () => setFilterType('All')
        },
        {
            label: 'Title',
            href: '#',
            onClick: () => setFilterType('Title')
        },
        {
            label: 'Status',
            href: '#',
            onClick: () => setFilterType('Status')
        }
    ]

    // Handle search input change
    const handleSearch = e => {
        const value = e.target.value
        setSearch(value)
    }

    // Filter tasks based on the search query
    useEffect(() => {
        let filtered = tasks.data

        if (filterType === 'All') {
            filtered = alltasks
            filtered = filtered.filter(task => {
                return (
                    task.title.toLowerCase().includes(search.toLowerCase()) ||
                    task.description.toLowerCase().includes(search.toLowerCase()) ||
                    task.status.toLowerCase().includes(search.toLowerCase())
                )
            })
        } else {
            filtered = filtered.filter(task => {
                if (filterType === 'Title') {
                    return task.title
                        .toLowerCase()
                        .includes(search.toLowerCase())
                } else if (filterType === 'Status') {
                    return task.status
                        .toLowerCase()
                        .includes(search.toLowerCase())
                }
                return false
            })
        }

        setFilteredTasks(filtered)
    }, [search, tasks, alltasks, filterType])

    // The deleteTask function is used to delete a task
    const deleteTask = id => {
        swal({
            title: 'Are you sure?',
            text: 'Once deleted you will not be able to recover this task!',
            icon: 'warning',
            buttons: true,
            dangerMode: true
        }).then(willDelete => {
            if (willDelete) {
                router.delete(`/tasks/${id}`, {
                    preserveScroll: true,
                    preserveState: true
                })
                swal('Poof! Your task has been deleted!', {
                    icon: 'success'
                })
            }
        })
    }

    // The columns array is used to define the table columns
    const columns = [
        {
            header: 'Title',
            accessor: 'title'
        },
        {
            header: 'Description',
            accessor: 'description'
        },
        {
            header: 'Status',
            accessor: 'status'
        }
    ]

    // The actions function is used to render the actions column
    const actions = task => (
        <>
            <Link href={route('tasks.edit', task.id)}>
                <PencilSquareIcon
                    type="button"
                    className="size-6 text-blue-500 hover:text-blue-600"
                />
            </Link>
            <TrashIcon
                onClick={() => {
                    deleteTask(task.id)
                }}
                className="size-6 cursor-pointer text-red-500 hover:text-red-600"
            />
        </>
    )

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex font-semibold text-xl text-gray-800 leading-tight">
                    <h1 className="flex-1">Tasks</h1>
                    <Link href={route('tasks.create')}>
                        <PrimaryButton className="bg-blue-600 hover:bg-blue-700 focus:bg-blue-600 active:bg-blue-700">
                            Create
                            <PlusCircleIcon className="size-6 mx-3 text-white-500" />
                        </PrimaryButton>
                    </Link>
                </div>
            }
        >
            <Head title="Tasks" />

            <div className="flex flex-col p-12">
                <div className="-m-1.5 overflow-x-auto">
                    <div className="flex p-4">
                        <TextInput
                            id="search"
                            className="flex w-64 mx-4"
                            placeholder="Search tasks..."
                            autoComplete="search"
                            value={search}
                            onChange={handleSearch}
                        />
                        <DropdownMenu
                            buttonText="Filter"
                            menuItems={menuItems}
                        />
                    </div>
                    <div className="p-1.5 min-w-full inline-block align-middle">
                        <div className="overflow-hidden">
                            {/* The Table component is used here */}
                            <Table
                                columns={columns}
                                data={filteredTasks}
                                actions={actions}
                                emptyMessage="No tasks found."
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="p-1">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <Pagination tasks={tasks} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
