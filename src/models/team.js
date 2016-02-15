const TEAM = [
	{
		"id": "mg-timasheva",
		"name": "Марина Геннадьевна Тимашева",
		"position": "Директор",
		"edu": "Ленинградский инженерно-строительный институт",
		"diploma": "НВ №222567",
		"status": "",
		"picture": "https://static.shburg.org/art/team/teacher5.jpg",
		"anchor": "director"
	},
	{
		"id": "va-sarzhin",
		"name": "Валерий Александрович Саржин",
		"position": "Преподаватель живописи",
		"edu": "Академия художеств имени И. Е. Репина",
		"diploma": "B-I №259798",
		"status": "Первая квалификационная категория по живописи и станковой композиции",
		"picture": "https://static.shburg.org/art/team/teacher10.jpg"
	},
	{
		"id": "od-gogoleva",
		"name": "Ольга Дмитриевна Гоголева",
		"position": "Преподаватель живописи",
		"edu": "Ленинградский инженерно-строительный институт",
		"diploma": "B-I №222572",
		"status": "Высшая квалификационная категория по живописи и станковой композиции",
		"picture": "https://static.shburg.org/art/team/teacher11.jpg"
	},
	{
		"id": "nv-andreeva",
		"name": "Наталья Викторовна Андреева",
		"position": "Преподаватель композиции",
		"edu": "Санкт-Петербургский государственный университет технологии и дизайна",
		"diploma": "ИВС 0514253",
		"status": "Вторая квалификационная категория по прикладной композиции",
		"picture": "https://static.shburg.org/art/team/teacher2.jpg"
	},
	{
		"id": "vv-voronova",
		"name": "Вера Викторовна Воронова",
		"position": "Преподаватель композииции",
		"edu": "Российский государственный университет имени А. И. Герцена",
		"diploma": "ВСГ 0530340",
		"status": "Вторая квалификационная категория по прикладной композиции",
		"picture": "https://static.shburg.org/art/team/teacher1.jpg"
	},
	{
		"id": "in-vturina",
		"name": "Ирина Николаевна Втюрина",
		"position": "Преподаватель скульптуры",
		"edu": "Кировский государственный педагогический институт имени В. И. Ленина",
		"diploma": "ШВ №164501",
		"status": "Первая квалификационная категория по скульптуре",
		"picture": "https://static.shburg.org/art/team/teacher8.jpg"
	},
	{
		"id": "my-valkova",
		"name": "Мария Юрьевна Валькова",
		"position": "Преподаватель истории искусства",
		"edu": "Педагогический институт имени А. И. Герцена",
		"diploma": "ПП №224197",
		"status": "Высшая квалификационная категория по истории искусства",
		"picture": "https://static.shburg.org/art/team/teacher12.jpg"
	},
	{
		"id": "rk-timashev",
		"name": "Руслан Камилевич Тимашев",
		"position": "Преподаватель компьютерной графики",
		"edu": "Санкт-Петербургский государственный архитектурно-строительный университет",
		"diploma": "ВСГ 5344910",
		"status": "",
		"picture": "https://static.shburg.org/art/team/teacher4.jpg"
	},
	{
		"id": "as-timasheva",
		"name": "Анна Сергеевна Тимашева",
		"position": "Преподаватель рисунка",
		"edu": "Московский архитектурный институт",
		"diploma": "РН 70241",
		"status": "",
		"picture": "https://static.shburg.org/art/team/teacher3.jpg",
		"contacts": {
			"instagram": "annm101"
		}
	},
	{
		"id": "sa-latipova",
		"name": "Серафима Александровна Латыпова",
		"position": "Преподаватель рисунка",
		"edu": "Незаконченный Ленинградский государственный педагогический университет имени А. С. Пушкина",
		"diploma": "",
		"status": "",
		"picture": "https://static.shburg.org/art/team/teacher9.jpg"
	},
	{
		"id": "ey-tarasova",
		"name": "Евгения Юрьевна Тарасова",
		"position": "Преподаватель гравюры",
		"edu": "Санкт-Петербургский государственный архитектурно-строительный университет",
		"diploma": "ВСВ 1321444",
		"status": "",
		"picture": "https://static.shburg.org/art/team/teacher.jpg"
	},
	{
		"id": "ea-burovtseva",
		"name": "Елена Александровна Буровцева",
		"position": "Преподаватель керамики",
		"edu": "",
		"diploma": "",
		"status": "",
		"picture": "https://static.shburg.org/art/team/ea-burovtseva.jpg"
	}
];

module.exports = {
	team: TEAM,
	person: getPersonByID,
	name: getNameByID,
	short: getShortNameByID,
	splitName: splitName
};

function getPersonByID(id){
	for(var i=0; i<TEAM.length; i++){
		var p = TEAM[i];
		if(p.id == id){
			return p;
		}
	}
	return null;
}

function getNameByID(id){
	var p = getPersonByID(id);
	if(p) return p.name;
	else return null;
}

function getShortNameByID(id){
	var n = getNameByID(id);
	if(n) return shortifyName(n)
	else return null;
}

function shortifyName(name){
	var m = splitName(name);
	var n = m[1].replace(/^(.).+/, "$1. ") +
			m[2].replace(/^(.).+/, "$1. ") +
			m[3];
	return n;
}

function splitName(name){
	return /(.+)\s(.+)\s(.+)/.exec(name);
}