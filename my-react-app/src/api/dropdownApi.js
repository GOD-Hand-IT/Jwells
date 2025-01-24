export const fetchDropdownList = async () => {
    try {
        console.log('Fetching dropdown list...'); // Log before fetching
        const response = await fetch('http://localhost:3000/product/category');
        console.log('Response status:', response.status); // Log response status
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched dropdown list:', data); // Log the fetched response
        return data;
    } catch (error) {
        console.error('Failed to fetch dropdown list:', error);
        throw error;
    }
};
