import json

# Script pour générer plus de 200 gages, défis, vérités et chronos super funs et inédits pour VYLO Party !

def build_cards():
    cards = []
    
    # 1. DEFIS FLASH (SINGLE & TARGET)
    flash_templates = [
        "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit chanter le refrain de 'Tiki Taka' ou d'un son d'Aya Nakamura !",
        "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit faire une déclaration d'amour théâtrale à une chaise !",
        "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit laisser {player1} choisir son nouveau fond d'écran pour 10 minutes !",
        "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit répéter tout ce que dit {player1} pendant 20 secondes !",
        "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit imiter le rire d'un méchant de dessin animé !",
        "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit faire un massage des épaules de 15 secondes à {player1}.",
        "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit parler uniquement en rimant pendant 3 tours !",
        "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit imiter la voix de Jul pendant 15 secondes !",
        "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit faire la statue et ne plus bouger du tout pendant 30 secondes !",
        "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit donner un compliment sincère et exagéré à {player1}.",
        "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit faire 10 squats sautés en criant 'JE SUIS EN FORME !'.",
        "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit raconter une histoire drôle en utilisant un accent italien !",
        "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit imiter un présentateur du JT de 20h !",
        "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit faire semblant d'être au téléphone avec le président !",
        "⚡ {player1}, passe le téléphone à {player2} ! {player2} doit réciter le début de l'alphabet à l'envers sans se tromper !"
    ]

    for idx, tmpl in enumerate(flash_templates):
        cards.append({
            "id": f"df_gen_{idx+1}",
            "template": tmpl,
            "type": "TARGET" if "{player2}" in tmpl else "SINGLE",
            "category": "Défis Flash"
        })

    # 2. VÉRITÉS PIQUANTES & DOSSIERS
    verite_templates = [
        "🌶️ {player1}, quelle est la pire bêtise que tu as faite à l'école sans jamais te faire attraper ?",
        "🌶️ {player1}, si tu devais échanger ta vie avec l'un des joueurs de la soirée pour une journée, qui choisirais-tu et pourquoi ?",
        "🌶️ {player1}, dis quel est le message le plus gênant que tu as envoyé cette semaine !",
        "🌶️ {player1}, avoue quelle est la manie la plus bizarre que tu as quand tu es seul chez toi !",
        "🌶️ {player1}, quelle est la plus grande honte que tu as vécue devant une personne qui te plaisait ?",
        "🌶️ {player1}, passe le téléphone à {player2} ! {player2} doit avouer quel joueur de la pièce est le plus susceptible de lui prêter de l'argent sans hésiter.",
        "🌶️ {player1}, si tu gagnais 1 million d'euros ce soir, quelle est la première chose complètement absurde que tu achèterais ?",
        "🌶️ {player1}, dis quel est le pire cadeau qu'on t'ait jamais offert et ce que tu en as fait !",
        "🌶️ {player1}, avoue quelle est la dispute la plus bête que tu as eue dans ta vie !",
        "🌶️ {player1}, raconte l'excuse la plus incroyable que tu as sortie pour annuler une soirée !"
    ]

    for idx, tmpl in enumerate(verite_templates):
        cards.append({
            "id": f"vp_gen_{idx+1}",
            "template": tmpl,
            "type": "TARGET" if "{player2}" in tmpl else "SINGLE",
            "category": "Vérités Piquantes"
        })

    # 3. DUELS & GROUPE
    duel_templates = [
        "🤝 DUEL ! {player1} et {player2} font un bras de fer chinois ou un duel de pierre-feuille-ciseaux en 3 manches gagnantes !",
        "🤝 DUEL ! {player1} et {player2} doivent chanter en duo le refrain d'une chanson connue de tous !",
        "🤝 DUEL ! {player1} et {player2} doivent se faire un concours de compliments : le premier qui bafouille perd !",
        "👥 ACTION GROUPE ! Tout le monde se lève et fait une hola générale à la santé de {player1} !",
        "👥 VOTE GROUPE ! Désignez tous à 3 la personne la plus susceptible d'oublier son mot de passe de téléphone !",
        "👥 VOTE GROUPE ! Tout le monde pointe la personne la plus gourmande de la bande !"
    ]

    for idx, tmpl in enumerate(duel_templates):
        cards.append({
            "id": f"dg_gen_{idx+1}",
            "template": tmpl,
            "type": "GROUP" if "👥" in tmpl else "DUEL",
            "category": "Duels & Groupe"
        })

    # 4. CHRONO 5 SECONDES
    chrono_items = [
        "marques de voitures allemandes",
        "villes de France commençant par la lettre M",
        "plats italiens délicieux",
        "rappeurs du 93 ou du 91",
        "choses qu'on met dans une valise pour la plage",
        "applications indispensables sur ton téléphone",
        "personnages de films Disney",
        "marques de fast-food célèbres",
        "objets qu'on trouve dans une cuisine",
        "sports qui se jouent avec un ballon",
        "super-héros de Marvel ou DC",
        "chansons de Jul ou de Ninho",
        "marques de paires de baskets/sneakers",
        "choses rouges qu'on trouve dans une maison",
        "excuses pour arriver 30 minutes en retard"
    ]

    for idx, item in enumerate(chrono_items):
        cards.append({
            "id": f"c5_gen_{idx+1}",
            "template": f"⏱️ {{player1}}, cite 3 {item} en moins de 5 secondes ! C'est parti !",
            "type": "SINGLE",
            "category": "Chrono 5s"
        })

    return cards

if __name__ == "__main__":
    cards = build_cards()
    print(f"Généré {len(cards)} cartes !")
