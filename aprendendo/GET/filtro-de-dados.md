
# Filtros de Dados

Este guia apresenta as principais formas de filtrar dados em rotas GET de uma API REST, utilizando parâmetros na URL (Query String).

---

## 1. Seleção por ID

Permite buscar um registro específico pelo seu ID.

**Exemplo:**

```http
GET /monstros/1
```

**Retorno:**
```json
{
    "id": 1,
    "nome": "James P. Sullivan",
    "descricao": "Monstro gigante similar a um minotauro peludo...",
    "tipo_criatura": "Minotauro Peludo",
    "pontos_vida": 15,
    "ataque": 1,
    "defesa": 3,
    "habitat": "Universidade Monstros S.A."
}
```

---

## 2. Filtros via Query String

Os filtros podem ser combinados e aplicados diretamente na URL, após o símbolo `?`.

### Principais tipos de filtros:

<details>
<summary><strong>Por propriedade específica</strong></summary>

Busca por valor exato de uma propriedade.

<br>
<strong>Sintaxe:</strong>
```http
GET /monstros?tipo_criatura=Besta
```
<strong>Retorno:</strong> Todos os monstros cujo tipo de criatura seja "Besta".
</details>

<details>
<summary><strong>Por intervalo (range)</strong></summary>

Ideal para propriedades numéricas ou datas.

<br>
<strong>Sintaxe:</strong>
```http
GET /monstros?pontos_vida_min=50&pontos_vida_max=150
```
<strong>Retorno:</strong> Monstros com pontos de vida entre 50 e 150.
</details>

<details>
<summary><strong>Busca por texto</strong></summary>

Busca por palavra-chave no nome ou descrição.

<br>
<strong>Sintaxe:</strong>
```http
GET /monstros?busca=fogo
GET /monstros?q=fogo
```
<strong>Retorno:</strong> Monstros cujo nome ou descrição contenha a palavra "fogo".
</details>

<details>
<summary><strong>Ordenação (sorting)</strong></summary>

Define a ordem dos resultados.

<br>
<strong>Sintaxe:</strong>
```http
GET /monstros?ordenar_por=ataque&direcao=desc
```
<strong>Retorno:</strong> Lista de monstros ordenada pelo ataque, do mais forte para o mais fraco.
</details>

---

## 3. Combinação de filtros

Os filtros podem ser combinados usando o caractere `&`.

**Exemplo combinado:**
```http
GET /monstros?tipo_criatura=Besta&pontos_vida_min=50&ordenar_por=ataque&direcao=desc
```
Retorna todas as "Bestas" com mais de 50 pontos de vida, ordenadas do ataque mais forte para o mais fraco.
