"use client"

import React, { useState, useMemo } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from "@nextui-org/react";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

const Page = () => {
    const [formdata, setFormdata] = useState({
        file: {}
    });
    function onChange(e) {
        if (e.target.files) {
            setFormdata((prev) => ({
                ...prev,
                file: e.target.files
            }))
        }
    }

    function onSubmit(e) {
        e.preventDefault();
        console.log(formdata);
    }

    const [page, setPage] = useState(1);

    const { data, isLoading } = useSWR(`https://swapi.py4e.com/api/people?page=${page}`, fetcher, {
        keepPreviousData: true,
    });

    const rowsPerPage = 10;

    const pages = useMemo(() => {
        return data?.count ? Math.ceil(data.count / rowsPerPage) : 0;
    }, [data?.count, rowsPerPage]);

    const loadingState = isLoading || data?.results.length === 0 ? "loading" : "idle";

    return (
        <div className='p-8'>
            <div className='text-5xl font-semibold text-center mt-10'>
                <p>Create Users</p>
            </div>
            <div className='w-full flex mt-16 justify-center'>
                <div className='w-[40%] space-y-4'>
                    <div>
                        <label htmlFor="name">Upload CSV:</label>
                    </div>
                    <div>
                        <input type='file' accept='.csv,.xlsx' name='name' id='name' className='bg-white w-full text-black py-2 px-3 w-64' placeholder='Upload CSV File' onChange={onChange} />
                    </div>
                    <div>
                        <button type="submit" onClick={onSubmit} className='bg-orange-500 w-full py-2 px-3 hover:bg-orange-600 focus:bg-orange-700'>Upload CSV</button>
                    </div>
                </div>
            </div>
            <div className='mt-12 border border-white'>
                <Table aria-label="Example static collection table"
                    className='p-2'
                    bottomContent={
                        pages > 0 ? (
                            <div className="flex w-full justify-center">
                                <Pagination
                                    isCompact
                                    showControls
                                    showShadow
                                    color="primary"
                                    page={page}
                                    total={pages}
                                    onChange={(page) => setPage(page)}
                                />
                            </div>
                        ) : null
                    }
                // {...args}
                >
                    <TableHeader>
                        <TableColumn>NAME</TableColumn>
                        <TableColumn>ROLE</TableColumn>
                        <TableColumn>STATUS</TableColumn>
                    </TableHeader>
                    <TableBody
                        items={data?.results ?? []}
                        // loadingContent={<Spinner />}
                        loadingState={loadingState}
                    >
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                        {(item) => (
                            <TableRow key={item?.name}>
                                {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                            </TableRow>
                        )}
                        <TableRow key="1" className='border border-white'>
                            <TableCell>
                                <div className='text-center'>
                                    Tony Reichert
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='text-center'>
                                    CEO
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className='text-center'>
                                    Active
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default Page
