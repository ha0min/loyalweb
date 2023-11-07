import { useListState } from '@mantine/hooks';
import { useEffect, useState } from 'react';
import { Checkbox, Container, Divider, Group, Radio, RadioGroup, Text } from '@mantine/core';

type ProductFilterProps = {
    categories: string[],
    onCategoryChange: (selectedCategories: string[]) => void;
    onSortChange: (sortOrder: 'asc' | 'des') => void;
};

const ProductFilter = (props: ProductFilterProps) => {
    console.log('ProductFilter props', props);
    const initialCategoryState = props.categories.map((category) => ({
        label: category,
        checked: true,
        key: category,
    }));

    const [sortOrder, setSortOrder] = useState<'asc' | 'des'>('asc'); // Default sort order

    const [categoryValues, categoryHandlers] = useListState(initialCategoryState);

    const allChecked = categoryValues.every((value) => value.checked);
    const indeterminate = categoryValues.some((value) => value.checked) && !allChecked;

    const handleCategoryChange = (index, checked) => {
        // console.log('handleCategoryChange index checked', index, checked);

        categoryHandlers.setItemProp(index, 'checked', checked);
    };

    useEffect(() => {
        const updatedCategories = categoryValues
            .filter((value) => value.checked)
            .map((value) => value.label);
        console.log('Updated categories:', updatedCategories);

        // Trigger the parent component's category change handler with the new list of selected categories
        props.onCategoryChange(updatedCategories);
    }, [categoryValues]);

    useEffect(() => {
        console.log('Reset categories if they change', props.categories);

        categoryHandlers.setState(
            props.categories.map((category) => ({
                label: category,
                checked: true,
                key: category,
            }))
        );
    }, [props.categories]);

    const items = categoryValues.map((value, index) => (
        <Checkbox
            mt="xs"
            ml={10}
            label={value.label}
            key={value.key}
            checked={value.checked}
            onChange={(event) => handleCategoryChange(index, event.currentTarget.checked)}
        />
    ));

    const handleSortChange = (value) => {
        setSortOrder(value);
        props.onSortChange(value); // Assuming you have an onSortChange prop to communicate the sort order to the parent
    };

    return (
        <Container
            style={{
                position: 'sticky',
                }}
        >
            <Text size="xl" fw={500} my="md">Ordering</Text>
            <RadioGroup
                value={sortOrder}
                onChange={handleSortChange}
            >
                <Radio mt="sm" value="asc" label="Price Low to High" />
                <Radio mt="sm" value="dsc" label="Price High to Low" />
            </RadioGroup>
            <Divider my="sm" />

            <Text my="md" size="xl" fw={500}>Filter by categories</Text>
            <Checkbox
                checked={allChecked}
                indeterminate={indeterminate}
                label="All categories"
                onChange={() =>
                    categoryHandlers.setState((current) =>
                        current.map((value) => ({
                            ...value,
                            checked: !allChecked,
                        }))
                    )
                }
            />
            <Group>{items}</Group>

        </Container>
    );
};

export default ProductFilter;
