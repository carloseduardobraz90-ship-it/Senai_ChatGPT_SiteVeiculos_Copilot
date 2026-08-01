# Senai_ChatGPT_SiteVeiculos_Copilot

# 🏎️ Lux Motors — Showroom & Dealership Web App

> Aplicação web interativa para uma concessionária de veículos de alta performance e alto luxo, desenvolvida com HTML5, CSS3, JavaScript Vanilla e manipulação de dados via JSON.

![Lux Motors Preview](https://img.shields.io/badge/Status-Conclu%C3%ADdo-brightgreen?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

---

## 📌 Sobre o Projeto

O **Lux Motors** é um projeto de aplicação web que simula uma concessionária premium de superesportivos. A plataforma consome um catálogo de veículos de um arquivo JSON local e permite ao usuário filtrar por fabricantes, ordenar por faixa de preço, visualizar fotos em alta definição através de um modal interativo e gerenciar uma garagem virtual de reservas com cálculo automático em tempo real.

---

## ✨ Funcionalidades

- 🚘 **Catálogo Dinâmico:** Carregamento assíncrono dos veículos a partir de um arquivo `data.json`.
- 🏷️ **Filtro Automático por Marca:** O sistema identifica automaticamente as marcas cadastradas e gera as opções de filtro no seletor.
- 💰 **Ordenação por Preço:** Possibilidade de ordenar a vitrine em ordem crescente (*Menor Preço*) ou decrescente (*Maior Preço*).
- 🔍 **Modal / Lightbox de Imagem:** Clique na imagem do veículo para ampliá-la em uma tela cheia interativa (com suporte a fechar no `X`, clique fora ou tecla `ESC`).
- 🛒 **Garagem / Carrinho de Reservas:** Adicione e remova veículos para simular a reserva, com cálculo do valor total atualizado dinamicamente.
- 📱 **Layout Responsivo:** Design moderno e escuro (*Dark Mode*), adaptado para desktops, tablets e smartphones.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5:** Estruturação semântica da página e acessibilidade.
- **CSS3:** Estilização com Grid Layout, Flexbox, animações customizadas e design responsivo.
- **JavaScript (ES6+):** Lógica dinâmica para consumo de Fetch API, manipuladores de evento, filtros combinados e gerenciamento do estado do carrinho.
- **JSON:** Armazenamento mockado do catálogo de produtos e especificações dos veículos.

---

## 📁 Estrutura do Projeto

```text
├── index.html     # Estrutura principal da aplicação
├── style.css      # Estilização visual e responsividade
├── script.js     # Lógica de filtros, modal e carrinho
├── data.json      # Catálogo com os dados dos veículos
└── README.md      # Documentação do projeto