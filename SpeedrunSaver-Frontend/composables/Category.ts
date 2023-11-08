export const getCategories = async (id) => 
{
    return await fetch(`http://localhost:5099/Categories/Game/${id}`)
        .then((res) => res.json())
        .then((data) => {
                return data;
            }
        );
}