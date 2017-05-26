const React = require('react')

import {getDates} from '../utils/date'
import {shortName} from '../models/collective'

const now = new Date()
const dates = getDates(now);

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const isToday = weekDayIndex => (now.getDay() - 1) === weekDayIndex;
const weekDay = weekDayIndex => dates[weekDayIndex];
const short = shortName;

const todayClass = i => isToday(i)
	? 'current'
	: ''

const HeadDay = ({i, children}) => (
	<div className={`${todayClass(i)}`}>
		<p className="day">{children}</p>
		<p className="date">{weekDay(i)}</p>
	</div>
)

const days2 = [
	'Понедельник',
	'Вторник',
	'Среда',
	'Четверг',
	'Пятница',
	'Суббота',
]

const Schedule = ({groups}) => (
	<div className="schedule-table">
		<div className="schedule-table__head">
			<div className="group">Гр.</div>

			{days2.map((day, index) => (
				<HeadDay key={index} i={index}>{day}</HeadDay>
			))}
		</div>

		<div className="schedule-table__body">
			{groups.map((group, index) => (
				<GroupRow key={index} {...group}/>
			))}
		</div>
	</div>
)

const GroupRow = ({name, time, week}) => (
	<div className="schedule-table__body-row">
		<div className="schedule-table__body-group">
			<p className="name">{name}</p>
			<p className="time">{time}</p>
		</div>

		{week.map((day, index) => (
			<Group key={index} day={day} dayIndex={index}/>
		))}
	</div>
)

const Group = ({day, dayIndex}) => (
	<div className={`schedule-table__record ${todayClass(dayIndex)}`}>
		{day.map((lesson, index) => (
			<Cell key={index} {...lesson}/>
		))}
	</div>
)

const Cell = ({course, teacher, time}) => (
	<div className="schedule-table__course">

		{
			console.log(time)
		}

		<Lesson {...course}/>

		<Teacher {...teacher}/>

		{time
			.map(range => ({range}))
			.map((range, index) => (
			<TimeRange key={index} {...range}/>
		))}
	</div>
)

const Lesson = ({title, url}) => (
	<p className="lesson">
		{url
			? (
				<a href={url}>
					{title}
				</a>
			)
			: (
				<span>
					{title}
				</span>
			)
		}
	</p>
)

const Teacher = ({name, url}) => (
	<p className="teacher">
		{url
			? (
				<a href={url}>
					{short(name)}
				</a>
			)
			: (
				<span>
					{short(name)}
				</span>
			)
		}
	</p>
)

const TimeRange = ({range}) => (
	<p className="time">{(range || []).join(' — ')}</p>
)

module.exports = Schedule
