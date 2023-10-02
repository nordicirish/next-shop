// Strapi web hook calls api route with updated object
export default async function handleRevalidate(req, res) {
  const event = req.body;
  if (event.model === "product") {
    const id = event.entry.id;
    // revalidate homepage path and product path
    // Promise all ensures both paths are revalidated at the same time
    await Promise.all([res.revalidate("/"), 
    res.revalidate(`/products/${id}`)]);
    console.log(`revalidated product ${id}`);
  }
  res.status(204).end;
}
