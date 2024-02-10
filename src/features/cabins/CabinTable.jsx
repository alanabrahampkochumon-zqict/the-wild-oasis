import { useSearchParams } from 'react-router-dom';

import Empty from '../../ui/Empty';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';

const CabinTable = () => {
    const { isLoading, cabins } = useCabins();

    const [searchParams] = useSearchParams();

    if (isLoading) return <Spinner />;

    if (!cabins.length) return <Empty resourceName="cabins" />;

    // 1) Filtering
    const filterValue = searchParams.get("discount") || "all";

    let filteredCabins;
    if (filterValue === "no-discount") {
        filteredCabins = cabins.filter((cabin) => cabin.discount === 0);
    } else if (filterValue === "with-discount") {
        filteredCabins = cabins.filter((cabin) => cabin.discount !== 0);
    } else {
        filteredCabins = cabins;
    }

    // 2) Sorting
    const sortBy = searchParams.get("sortBy") || "startDate-asc";
    const [field, direction] = sortBy.split("-");
    console.log(field, direction);
    const modifier = direction === "asc" ? 1 : -1;
    let sortedCabins = filteredCabins.sort(
        (a, b) => modifier * (a[field] - b[field])
    );
    console.log(modifier);

    return (
        <Menus>
            <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
                <Table.Header>
                    <div></div>
                    <div>Cabin</div>
                    <div>Capacity</div>
                    <div>Price</div>
                    <div>Discount</div>
                    <div></div>
                </Table.Header>
                <Table.Body
                    // data={cabins}
                    data={sortedCabins}
                    render={(cabin) => (
                        <CabinRow cabin={cabin} key={cabin.id} />
                    )}
                />
            </Table>
        </Menus>
    );
};

export default CabinTable;
