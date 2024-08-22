import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, useForm } from '@inertiajs/react'
import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import PrimaryButton from '@/Components/PrimaryButton'
import TextInput from '@/Components/TextInput'
import SelectInput from '@/Components/SelectInput'
import { Transition } from '@headlessui/react'

export default function Create({ auth }) {
    const statusOptions = ['pending', 'in progress', 'completed']

    const { data, setData, post, errors, processing, recentlySuccessful, reset} =
        useForm({
            user_id: auth.user.id,
            title: '',
            description: '',
            status: ''
        })

    const submit = e => {
        e.preventDefault()

        post(route('tasks.store'), {
            preserveScroll: true,
            onSuccess: () => reset('title', 'description', 'status')
       })
    }

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Create
                </h2>
            }
        >
            <Head title="Create" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white p-12 overflow-hidden shadow-sm sm:rounded-lg">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900">
                                    Create Task
                                </h2>

                                <p className="mt-1 text-sm text-gray-900">
                                    Fill in the form below to create a new task.
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
                                        Create
                                    </PrimaryButton>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-900">
                                            Created.
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
