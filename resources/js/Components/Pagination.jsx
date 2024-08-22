import React from 'react'
import { Link } from '@inertiajs/react'

export default function Pagination({ tasks }) {
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            {/* Mobile View: Previous and Next Buttons */}
            <div className="flex flex-1 justify-between sm:hidden">
                <Link
                    href={tasks.prev_page_url}
                    preserveScroll
                    className={`relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                        tasks.prev_page_url
                            ? 'text-gray-700 hover:bg-gray-50'
                            : 'text-gray-400 cursor-not-allowed'
                    }`}
                >
                    Previous
                </Link>
                <Link
                    href={tasks.next_page_url}
                    preserveScroll
                    className={`relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium ${
                        tasks.next_page_url
                            ? 'text-gray-700 hover:bg-gray-50'
                            : 'text-gray-400 cursor-not-allowed'
                    }`}
                >
                    Next
                </Link>
            </div>

            {/* Desktop View: Pagination Links */}
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing{' '}
                        <span className="font-medium text-black">{tasks.from} </span>
                        to{' '}
                        <span className="font-medium text-black">{tasks.to} </span>
                        of{' '}
                        <span className="font-medium text-black">{tasks.total}</span>{' '}
                        results
                    </p>
                </div>
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        {tasks.links.map((link, index) => (
                            <Link
                                preserveScroll
                                href={link.url}
                                key={index}
                                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                                    link.active
                                        ? 'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
                                        : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                                } ${
                                    !link.url &&
                                    'text-gray-400 cursor-not-allowed'
                                }`}
                                aria-current={link.active ? 'page' : undefined}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    )
}
