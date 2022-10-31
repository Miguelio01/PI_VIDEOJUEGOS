import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail, cleanData } from '../../redux/actions/index';
import { useEffect, useState } from 'react';
import s from './Detail.module.css';
import image from '../../assets/BG-02.png';
import Loading from '../loading/Loading';
import NotFound from '../notFound/NotFound';

export default function Detail() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const detail = useSelector((state) => state.detail);
	const [loading, setLoading] = useState(true);

	if (Object.keys(detail).length > 0 && loading) {
		setLoading(false);
	}

	useEffect(() => {
		dispatch(getDetail(id));
		return dispatch(cleanData(id));
	}, [dispatch, id]);

	return (
		<div className={s.bg}>
			<img className={s.image} src={image} alt='' />

			{Object.keys(detail).length > 0 && !loading ? (
				<div className={s.conten}>
					<div className={s.cimg}>
						<img
							className={s.img}
							src={detail.background_image}
							alt={detail.name}
						/>
					</div>
					<div className={s.cont}>
						<h1>{detail.name}</h1>
						<h2>Description</h2>
						<p>{detail.description}</p>

						<div className={s.ctext}>
							<div>
								<h2>Genres</h2>
							</div>
							<div className={s.ctext}>
								{' '}
								{detail.genres?.map((e) => (
									<p key={e}>
										{' '}
										{e}
										{'  ,'}
										<br />
									</p>
								))}
								<br />
							</div>
						</div>

						<div className={s.ctext}>
							<div>
								<h2>Platforms</h2>
							</div>
							<div className={s.ctext}>
								<br />
								{detail.platforms?.map((e) => (
									<p>
										{' '}
										{e}
										{'  ,'}
										<br />
									</p>
								))}
							</div>
						</div>

						<div className={s.ctext}>
							<div>
								<h3>Rating: </h3>
							</div>
							<div className={s.ctext}>
								<p>{detail.rating}</p>
							</div>
						</div>

						<div className={s.ctext}>
							<div>
								<h3>Released: </h3>
							</div>
							<div className={s.ctext}>
								<p>{detail.released}</p>
							</div>
						</div>

						<button className={s.btn}>
							<Link className={s.link} to='/home'>
								Home
							</Link>
						</button>
					</div>
				</div>
			) : !Object.keys(detail).length > 0 && loading ? (
				<Loading />
			) : (
				detail.length === 0 && <NotFound />
			)}
		</div>
	);
}
