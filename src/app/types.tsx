export type CategoryType = {
    id:string,
    name:string,
    count:number
}
export type Food = {
    _id:string,
    name:string,
    price:number,
    image:string,
    ingredients:string,
    category: string,

}
export type FoodItem = {
    food:Food,
    quantity:number
}