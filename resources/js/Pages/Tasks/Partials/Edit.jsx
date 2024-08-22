import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import SelectInput from '@/Components/SelectInput'
import { Transition } from '@headlessui/react'

export default function Edit({ auth, task }) {
    const statusOptions = ['pending', 'in progress', 'completed']

    const { data, setData, patch, errors, processing, recentlySuccessful, reset} =
        useForm({
            user_id: task.user_id,
            title: task.title,
            description: task.description,
            status: task.status
        })

    const submit = e => {
        e.preventDefault()

        patch(route('tasks.update', task.id), {
            preserveScroll: true,
        });
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Edit
                </h2>
            }
        >
            <Head title="Edit" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-12 overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Edit Task
                                </h2>

                                <p className="mt-1 text-sm text-gray-900">
                                    Fill in the form below to edit a task.
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="title" value="title" />

                                    <TextInput
                                        id="title"
                                        className="mt-1 block w-full"
                                        value={data.title}
                                        onChange={e =>
                                            setData('title', e.target.value)
                                        }
                                        required
                                        isFocused
                                        autoComplete="title"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.title}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="description"
                                        value="description"
                                    />

                                    <TextInput
                                        id="description"
                                        className="mt-1 block w-full"
                                        value={data.description}
                                        onChange={e =>
                                            setData(
                                                'description',
                                                e.target.value
                                            )
                                        }
                                        required
                                        isFocused
                                        autoComplete="description"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.description}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="status"
                                        value="status"
                                    />

                                    <SelectInput
                                        id="status"
                                        className="mt-1 block w-full"
                                        value={data.status}
                                        onChange={e =>
                                            setData('status', e.target.value)
                                        }
                                        options={statusOptions.map(option => ({
                                            value: option,
                                            label: option
                                        }))}
                                        required
                                        isFocused
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.status}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <PrimaryButton disabled={processing}>
                                        Update
                                    </PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-900">
                                            Updated.
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    )
}
