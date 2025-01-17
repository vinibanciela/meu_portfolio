import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoGlobalSolution } from "@/types/types";

export async function GET() {
  const file = await fs.readFile(process.cwd() + "/src/data/globalsolution.json", "utf-8");
  const data: TipoGlobalSolution[] = JSON.parse(file);
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const file = await fs.readFile(process.cwd() + "/src/data/globalsolution.json", "utf-8");
  const solutions: TipoGlobalSolution[] = JSON.parse(file);

  const newSolution: TipoGlobalSolution = await request.json();

  const novoId = solutions.length > 0 ? Math.max(...solutions.map((solution) => solution.id)) + 1 : 1; // Gera o ID baseado no maior existente
  newSolution.id = novoId;
  solutions.push(newSolution);

  const fileUpdate = JSON.stringify(solutions, null, 2);
  await fs.writeFile(process.cwd() + "/src/data/globalsolution.json", fileUpdate);

  return NextResponse.json(newSolution, { status: 201 });
}
