import { match } from "assert";
import { AppError } from "./app.error";
import { Recipe, RecipeType } from "./recipe";
import { Store } from "./stores/store.type";

export async function list(store: Store<RecipeType[]>, args: string[]) {
  if(args.length > 0){
    throw new AppError(`The list command should not have any argument.`)
  }

  const recipe = new Recipe(store);
  const recipes = await recipe.readAll();
  const formatted = recipes
    .map((recipe) => `- [${recipe.id}] ${recipe.name}`)
    .join('\n');
  console.log('Your recipes:');
  console.log(formatted);
}

export async function details(store:Store<RecipeType[]>, args: string[]) {

  const id: number = Number(args[0]);
  
  if(Number.isNaN(id)){
    throw new AppError("Argument after the details command should be a number")
  }
  const recipes = new Recipe(store);
  const recipe = await recipes.findById(id);
  console.log(`ID: ${recipe?.id}`)
  console.log(`Name: ${recipe?.name}`)
}
