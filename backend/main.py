from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"]
)

livros = [
    {
        "id": 1,
        "titulo": "Dom Casmurro",
        "autor": "Machado de Assis",
        "disponivel": True
    }
]

@app.get("/livros")
def listar_livros():
    return [{"id": 1, "titulo": "O Senhor dos Anéis"}, {"id": 2, "titulo": "Dom Casmurro"}]

@app.post("/livros")
def adicionar_livro(livro: dict):
    livros.append(livro)
    return {"mensagem": "Livro adicionado"}

@app.put("/livros/{id}")
def atualizar_livro(id: int, novo: dict):
    for livro in livros:
        if livro["id"] == id:
            livro.update(novo)
            return {"mensagem": "Livro atualizado"}

@app.delete("/livros/{id}")
def excluir_livro(id: int):
    for livro in livros:
        if livro["id"] == id:
            livros.remove(livro)
            return {"mensagem": "Livro removido"}
